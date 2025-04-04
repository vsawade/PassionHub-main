import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';

import userService from '../Services/userService.js';


// Controller function for user registration
const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body; // get details from request body

        const isUsernameExisting = await User.findOne({ username });
        if (isUsernameExisting) return res.status(400).json({ success: false, error: "Username is already in use!" }); // if username already exists in db, throw error

        const isEmailExisting = await User.findOne({ email });
        if (isEmailExisting) return res.status(400).json({ success: false, error: "This email is already registered!" }); //if email already exists in db, throw error

        const newUser = await userService.registerUser(req.body); // using userService to register the user
        res.json({ success: true, user: newUser }); //successful registration

    } catch (error) { // Handle any errors that occur during the registration process

        res.status(500).json({ success: false, error: "Internal server error. Sorry for the inconvenience." });

    }

}


// Controller function for user login
const loginUser = async(req, res) => {
    try {
        // Get the email and password from the request body
        const { email, password } = req.body;

        // Use the loginUser function from userService to authenticate the user
        const user = await userService.loginUser(email, password);

        // If user is found and password is valid, return a success message
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

// Controller function for getting user info
const getUserInfo = async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserInfo(userId);
        return res.status(200).json({ message: 'User details retrieved', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
// Controller function for updating user category preferences
const updateCategoryPreferences = async(req, res) => {
    try {
        const userId = req.body.userId;
        const preferences = req.body.preferences;

        const updatedUser = await userService.updateCategoryPreferences(userId, preferences);

        return res.status(200).json({ message: 'Preferences updated', updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

// Controller function for getting user category preferences
const getCategoryPreferences = async(req, res) => {
    try {
        const userId = req.body.userId;
        const categories = await userService.getCategoryPreferences(userId);

        return res.status(200).json({ message: "Success", categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

// Controller function for uploading user profile picture
const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profilePicture = req.body.profilePicture;
    const updatedUser = await userService.updateProfilePicture(userId, profilePicture);
    return res.status(200).json({message: 'Profile picture updated', updatedUser});
  } catch(error){
    console.error(error);
    return res.status(500).json({error: error.message});
  }
}

// Export the loginUser function
const userController = {
    registerUser,
    loginUser,
    getCategoryPreferences,
    updateCategoryPreferences,
    getUserInfo,
    uploadProfilePicture
};
export default userController;