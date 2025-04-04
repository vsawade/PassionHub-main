import Group from '../Models/groupModel.js';
import User from '../Models/userModel.js';
const groupService = {
    createGroup: async (groupName, desc, creator, category, isPaid,membershipFee,groupImage) => {
      try {
        // Create a new group
        const newgroup = await Group.create({
          name: groupName,
          desc: desc,
          creator: creator,
          members: [creator],
          category: category,
          isPaid: isPaid,
          membershipFee: membershipFee,
          groupImage: groupImage,
        });
        const updatedUser = await User.findByIdAndUpdate(
          creator,
          {$addToSet: {createdGroups: newgroup._id, groupMemberships: newgroup._id}}
        );
        
        return newgroup;
      } 
      catch (error) {
        throw error;
      }
    },
  //==============================================================================================
  joinGroup: async (userId, groupId) => {// join group functionality
    try{
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const group = await Group.findById(groupId);
      if (group.isPaid) {
        if (user.wallet >= group.membershipFee) {
          user.wallet -= group.membershipFee;
          await user.save();
        } else {
          throw new Error('Insufficient coins to join the group.');
        }
      }
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {$addToSet:{members: userId}}, //addToSet will add only if the user isnt present already
      {new: true}
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {$addToSet:{groupMemberships: groupId}}, //add the group into the user's memberships
      {new: true}
    );

      return updatedGroup;
    } catch(error){
        throw(error);
    }   
  },
  //==============================================================================================
  getGroupsRegistered: async (userId) => {
    try{ // get groups memberships of the user
      const user = await User.findById(userId).populate('groupMemberships'); //populate will essentially match the group id reference in the registeredGroups with the groups collection and actually populate it with content of the group
      
      if(!user) {
        throw new Error('User not found');
      }
      const registeredGroups = user.groupMemberships;
      return registeredGroups;

    } catch(error){
      throw(error);
    }
  },
  //==============================================================================================
  getGroupsByCategory: async (categories) => {
    try{ // get groups by category functionality
      const groups = await Group.find({ category: { $in: categories } }); // if the category is in the array of categories
      return groups;
    }catch(error){
      throw(error);
    }
  },
  //==============================================================================================
  getGroupInfo: async (groupId) => {
    try{ // get group info functionality
      const group = await Group.findOne({ _id: groupId }); 
      return group;
    }catch(error){
      throw(error);
    }
  },
  //==============================================================================================
  searchGroups: async (searchQuery) => {
    try { // search groups functionality    
      const regex = new RegExp(searchQuery, 'i');
      const searchResults = await Group.find({ name: regex });
      return { success: true, searchResults };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Internal server error' };
    }
  }
};

export default groupService;
