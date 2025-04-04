// GroupPage.tsx

import React, {useEffect, useState} from 'react';
import GroupPosts from './GroupPosts';
import '../CSS/InsideGroup/GroupMainPage.css';
import GroupAboutSection from './GroupAboutSection';
import MyGroupMembers from './MyGroupMembers';
import NavigationBar from './NavigationBar';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import { PostData } from './GroupPosts';
import CreateGroupNavigationBar from './CreateGroupNavigationBar';
import { updateUpvotesGiven } from '../redux/auth/authActions';
import { useDispatch } from 'react-redux';
import defaultImage from "../images/defaultPic.png";

interface groupPageProps{
  groupId: string;
}
interface MemberInfo {
  username: string;
}

// GroupPage page is the main page for a group
const GroupPage: React.FC<groupPageProps> = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [loaded, setLoaded] = useState(false);
  
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [category, setCategory] = useState("");
  const [creatorName, setCreatorName]= useState("");
  const [creatorId, setCreatorId] = useState("");
  const [memberIds, setMemberIds] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [groupImage, setGroupImage] = useState("");

  const profilePicture = useSelector((state:RootState) => state.auth.profilePicture);
  const [memberNames, setMemberNames] = useState<string[]>([]);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const upvotesGiven = useSelector((state: RootState) => state.auth.upvotesGiven);
  const [upvotesGivenNew, setUpvotesGivenNew] = useState<string[]>(upvotesGiven || []);
  const dispatch = useDispatch();

  // Get details of a member from their userId
  const getDetailsOfMember = async (userId: string): Promise<string> =>{
    try{
      const response = await fetch('/api/users/'+userId+'/details',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.user.username;
    }catch(error){
      console.error(error);
      return "Error";
    }
  }

  // Handle upvote button click for a post
  const handleUpvote = async (postId: string) => {
    const requestBody = {
      userId: userId,
    };
    try {
      const response = await fetch(`/api/users/upvote-post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      else{
        const data = await response.json();
        const updatedPost: PostData = data.post;
    setPosts(prevPosts => prevPosts.map(post => post._id === postId ? updatedPost : post));
    setUpvotesGivenNew(prevUpvotesGiven => [...prevUpvotesGiven, postId]);
    dispatch(updateUpvotesGiven(postId));
        
      }
    } catch (error) {
      console.error('Error during upvote:', error);
    }
  };

 
  // Get details of all members in the group
  const getAllMembers = async(memberIds: string[]):Promise<void> =>{
    try {
      const members: string[] = await Promise.all(memberIds.map(id => getDetailsOfMember(id)!));

    // Filter out undefined values
    const validMembers: string[] = members.filter(member => member !== undefined) as string[];

      setMemberNames(validMembers);
    } catch (error) {
      console.error("Error getting member details:", error);
    }
    
  }

  const getCreatorName = async(creatorId: string): Promise<void> =>{
    const name = await getDetailsOfMember(creatorId);
    if (name !== undefined) {
      setCreatorName(name.toString());
    }
  }

  
// Handle new post submission in the group page
    const handleNewPostSubmit = async (caption: string,postImageUrl: string) => {
      const requestBody = {
        creator: userId,
        groupId: groupId,
        content: caption,
        postImage: postImageUrl,
      };
      try {
        const response = await fetch('/api/users/create-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const newPost: PostData = data.post;
        setPosts(prevPosts => [newPost, ...prevPosts]);
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    };
  
// Get details of a group from its groupId
  const getGroupInfo=async(groupId: string): Promise<void>=>{
    const requestBody = {
      groupId: groupId
    };
    try{
      const response = await fetch('/api/users/group/'+groupId,{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      
        setName(data.group.name);
        setDesc(data.group.desc);
        setIsPaid(data.group.isPaid);
        setCategory(data.group.category);
        setMemberCount(data.group.members.length);
        setMemberIds(data.group.members);
        setCreatorId(data.group.creator);
        setPostIds(data.group.postsInGrp);
        setGroupImage(data.group.groupImage);
        
      
    } catch(error){
      console.log(error);
    }
  }

  // Get details of all posts in the group
  const getPosts = async(postIds: string[]): Promise<void>=>{
    const requestBody = {
      postIds: postIds
    };
    try{
      const response = await fetch('/api/users/group/'+groupId+'/posts',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      setPosts(data.posts);
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (groupId) {
          await getGroupInfo(groupId);
  
          if (postIds.length > 0) {
            await getPosts(postIds);
          }
          if(memberIds.length>0) {
            await getAllMembers(memberIds);
            
          }
          if(creatorId.length>0)
            await getCreatorName(creatorId); 
          
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [groupId, postIds.length, memberIds.length,  creatorId]);

  return (
    <div className="group-page">
      <CreateGroupNavigationBar profilePic={profilePicture || defaultImage} />
      {loaded ? (
        <div>
        {groupImage ? (
  <img className="group-image" src={groupImage}  />
) : (
  <p className="group-image-placeholder">No image provided</p>
)}
        <div className='groupnameflex'>
          <h1 className="group-name">{name}</h1>
          <h3 className="joined-group">Joined</h3>
        </div>
        <hr className="divider" />
        <div className="group-content">
          <div><GroupAboutSection memberCount={memberCount} isPaid={isPaid} category={category} creatorName={creatorName} /></div>
          <div className="posts"><GroupPosts posts={posts} onPostSubmit={handleNewPostSubmit} onUpvote={handleUpvote} upvotesGiven={upvotesGivenNew} /></div>
          <div><MyGroupMembers memberNames={memberNames} /></div>
          
        </div>
        </div>  ) :
        (
          <p>Loading groups...</p>
        )
    }
      
    </div>
  );
};

export default GroupPage;
