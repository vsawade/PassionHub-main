import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

//User Schema for MongoDB
const userSchema = new Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    categoryPreferences: [{
        type: String,
        required: true
    }],
    wallet: {
        type: Number,
        default: 150, // Start with 150 coins
      },
      upvotes: {
        type: Number,
        default: 0
    },
    upvotesGiven: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    badge:{
        type: String,
        default: "Bronze"
    },
    profilePicture: {
        type: String,
      },      
    //relationships
    createdGroups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    groupMemberships: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    createdPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

});

// //Password hashing before saving to DB
// userSchema.pre('save', async function(next){
//     try{
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(this.password, salt);
//         this.password = hashedPass; //update current password with hashed password before saving to db
//         next(); // Call next to move on to the next middleware or the save operation - it is convention
//     }
//     catch(error){
//         next(error);
//     }
// });


//Password Comparison for login
userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
return (candidatePassword === this.password);
}


// Update the user's badge based on the number of upvotes
userSchema.methods.updateBadge = async function () {
    const user = this;
    const upvotes = user.upvotes || 0;
    if (upvotes >= 15) {
        user.badge = "Platinum";
    } else if (upvotes >= 10) {
        user.badge = "Gold";
    } else if (upvotes >= 5) {
        user.badge = "Silver";
    } else {
        user.badge = "Bronze";
    }

    await user.save(); // Save the updated user with the new badge
};


const User = mongoose.model('User', userSchema);
export default User;
