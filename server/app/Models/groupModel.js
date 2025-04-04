import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Group Schema for MongoDB
const groupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
      },
    membershipFee: {
        type: Number,
        required: function() {
            return this.isPaid;
        }
    },
    groupImage: { 
        type: String,
    },
    //relationships
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    postsInGrp: [{type: Schema.Types.ObjectId, ref: 'Post'}]

});

const Group = mongoose.model('Group', groupSchema);

export default Group;
