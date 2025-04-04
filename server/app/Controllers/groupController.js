import groupService from '../Services/groupService.js';
import Group from '../Models/groupModel.js';



const groupController = {
  createGroup: async (req, res) => { // group creation functionality
    try {
      const body = req.body;
      const groupName = body.name;
      const creator = body.creator;
      const category = body.category;
      const isPaid = body.isPaid;
      const membershipFee = body.membershipFee;
      const desc = body.desc;
      const groupImage = body.groupImage;
      const groupNameExists = await Group.findOne({ name: groupName });
  
      if (groupNameExists) {
        return res.status(400).json({ success: false, error: 'Group with this name already exists' });
      }
  
      if (isPaid === undefined) {
        return res.status(400).json({ success: false, error: 'isPaid field is required' });
      }
  
      if (isPaid =='true' && membershipFee === undefined) {
        return res.status(400).json({ success: false, error: 'Membership fee is required for paid groups' });
      }
  
      const newgroup = await groupService.createGroup(groupName, desc, creator, category, isPaid, membershipFee,groupImage);
  
      res.status(201).json({ success: true, newgroup });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  //==============================================================================================
  joinGroup: async (req, res) => { // join group functionality
    try {
      const userId = req.body.userId; 
      const groupId = req.body.groupId;

      const group = await groupService.joinGroup(userId, groupId);

      res.status(201).json({ success: true, group });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
//==============================================================================================
  getGroupsRegistered: async (req, res) =>{ // get groups memberships of the user
    try{
      const userId = req.params.userId;
      const registeredGroups = await groupService.getGroupsRegistered(userId);
      
      res.status(201).json({ success: true, registeredGroups });
    } catch(error){
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  //==============================================================================================
  getGroupsByCategory: async (req,res) =>{// get groups by category functionality
    try{
      const categories = req.body.categories;
      
      const userId = req.body.userId;
      // Check if categories are provided
      if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or missing categories' });
      }

      const groups = await groupService.getGroupsByCategory(categories);
      const registeredGroups = await groupService.getGroupsRegistered(userId);
      //convert to string before comparison
      const filteredGroups = groups.filter(group => !registeredGroups.some(registeredGroup => registeredGroup._id.toString() === group._id.toString())); 
      res.status(200).json({ success: true, filteredGroups });

    }catch(error){
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
//==============================================================================================
getGroupInfo: async (req,res) =>{ // get group info functionality
  try{
    const groupId = req.params.groupId;
    const group = await groupService.getGroupInfo(groupId);
    
    res.status(200).json({ success: true, group });

  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
},
//==============================================================================================
searchGroups: async (req, res) => { // search groups functionality
  try {
    const { searchQuery } = req.body;
    const searchResults = await groupService.searchGroups(searchQuery);
    console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

  
};

export default groupController;
