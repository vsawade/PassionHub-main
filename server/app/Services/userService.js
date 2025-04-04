import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';

const userService = { //communicates with the userModel 
    //==============================================================================================
    loginUser: async(email, password) => {// login service logic
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    },
    //==============================================================================================
    registerUser: async(userInfo) => {// register service logic

        const newUser = await User.create({
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            categoryPreferences: userInfo.categoryPreferences
        });

        return newUser;
    },
    //==============================================================================================
    updateCategoryPreferences: async(userId, preferences) => {// update category preferences service logic

        const updatedUser = await User.findByIdAndUpdate(
            userId, {
                $push: { categoryPreferences: preferences }
            }, { new: true }
        );
        return updatedUser;
    },
  //==============================================================================================
    getCategoryPreferences: async(userId) => {// get category preferences service logic
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        const categories = user['categoryPreferences'];

        return categories;
    },
    //==============================================================================================
    getUserInfo: async(userId) => {// get user info service logic
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        await user.updateBadge();

        return user;
  },
  //==============================================================================================
  updateProfilePicture: async (userId, profilePicture) => {// update profile picture service logic
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );
    return updatedUser;
  }
};

export default userService;