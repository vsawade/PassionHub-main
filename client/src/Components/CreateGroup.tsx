import React,{useState} from 'react';
import CreateGroupNavigationBar from './CreateGroupNavigationBar';
import { Button, Grid, Container, TextField, Switch, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUpload';
import defaultImage from "../images/defaultPic.png";

// CreateGroup page component
const CreateGroup: React.FC = () => {

	const [formData, setFormData] = useState({
		groupName: '',
		membershipFee: false,
		membershipfeevalue: '',
		groupDescription: '',
		category: '',
		groupImage: '',
	  })

	const profilePicture = useSelector((state:RootState) => state.auth.profilePicture); // using redux to access profile picture
	const navigate = useNavigate();
	const userId = useSelector((state: RootState) => state.auth.userId); // using redux to access user id
	
	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prevData) => ({ ...prevData, [field]: value }));
	};

	// image data
	const onImageUploaded = (image: string) => {
		if (image) {
			setFormData((prevData) => ({
			  ...prevData,
			  groupImage: image,
			}));
		}

		return true;
	};

	const createGroup = async () => {
		try {
			const { groupName, membershipFee, membershipfeevalue, groupDescription, category, groupImage } = formData;
	  
			// Ensure required fields are filled
			if (!groupName || !groupDescription || !category) {
			  alert('Please fill in all required fields.');
			  return;
			}
			// setting range for membership fee between 0 and 1000
			const membershipFeeValue = parseFloat(membershipfeevalue);
    		if (membershipFee && (isNaN(membershipFeeValue) || membershipFeeValue <= 0 || membershipFeeValue >= 1000)) {
      			alert('Membership fee should be between 0 and 1000.');
      			return;
    }
			// Prepare the request body
			const requestBody = {
			  name: groupName,
			  creator: userId,
			  category: category,
			  isPaid: membershipFee,
			  membershipFee: membershipfeevalue,
			  desc: groupDescription,
			  groupImage: groupImage,
			};
			// Make the API call to create a group
			const response = await fetch('/api/users/create-group', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(requestBody),
			});
	  
			const responseData = await response.json();
	  
			if (response.ok) {
			  alert('Group created successfully!');
			  navigate('/home/' + userId);
			} else {
			  alert(`Error: ${responseData.error || 'Internal Server Error'}`);
			}
		  } catch (error) {
			console.error(error);
			alert('An unexpected error occurred. Please try again later.');
		  }
	};


	return (
		<div> 

		    <Container>
		    	<CreateGroupNavigationBar profilePic={profilePicture || defaultImage} />
	  			<Grid container spacing={3} columnSpacing={{ xs: 60, sm: 2, md: 3 }} >
	        		<Grid item xs={8}  sx={{ marginTop: '200px' }} >
	        		{/* Enter group name*/}
	        		<TextField label="Group name" variant="outlined" fullWidth  onChange={(e) => handleInputChange('groupName', e.target.value)}/>

	        		</Grid>


	        		<Grid item xs={4}  sx={{ marginTop: '200px' }} >
	        		{/* Membership fee switch button */}
	        			<FormGroup sx= {{ marginLeft: '50px' }} >
						  <FormControlLabel control={<Switch checked={formData.membershipFee} onChange={(e) => handleInputChange('membershipFee', e.target.checked)} size="medium" />} label="Membership fee" />
						</FormGroup>
	        		</Grid>


	        		<Grid item xs={8}  sx={{ marginTop: '5px' }} >
		        	{/* Enter group description*/}
		        	<TextField 
		        		label="Group description" 
		        		variant="outlined" 
		        		multiline
  						rows={4}
		        		fullWidth 
						onChange={(e) => handleInputChange('groupDescription', e.target.value)}/>
	        		</Grid>


	        		<Grid item xs={4} >
					<Grid item xs={12} sx={{ marginLeft: '50px', marginTop: '10px' }} >
								{/* Enter Fees Details */}
							<TextField label="Membership Fees" variant="outlined" fullWidth  onChange={(e) => handleInputChange('membershipfeevalue', e.target.value)} disabled={!formData.membershipFee}/>
						</Grid>	

					<Grid item xs={12} sx={{ marginTop: '5px' }} >	
		        		{/* Select cartegory dropdown */}
			        	<FormControl sx={{ marginLeft: '50px', marginTop: '5px', textAlign: 'left' }} fullWidth>
						  <InputLabel> Category </InputLabel>
						  <Select
						    labelId="demo-simple-select-label"
						    id="demo-simple-select"
						    label="Select category"
							value={formData.category}
							onChange={(e) => handleInputChange('category', e.target.value)}
							>
						    <MenuItem value={'Sports'}>Sports</MenuItem>
						    <MenuItem value={'Politics'}>Politics</MenuItem>
						    <MenuItem value={'Music'}>Music</MenuItem>
						    <MenuItem value={'Movies'}>Movies</MenuItem>
							<MenuItem value={'Technology'}>Technology</MenuItem>
							<MenuItem value={'Science'}>Science</MenuItem>
							<MenuItem value={'Arts'}>Arts</MenuItem>
							<MenuItem value={'Adventure'}>Adventure</MenuItem>
							<MenuItem value={'Other'}>Other</MenuItem>
						  </Select>
						</FormControl>
					</Grid>

	        		</Grid>
					
				
						

	        		<Grid item xs={11}  sx={{  marginLeft:'10px', marginTop: '5px' }} >
		        	
					<ImageUploader
						onImageSubmitted={onImageUploaded}
					/>
  
	        		</Grid>

			      <Grid container spacing={5}>
			        <Grid item xs={5}>
			        </Grid>
			        <Grid item xs={2}>
			          <Button 
			            type="submit"
			            variant="contained" 
			            color="primary" 
			            sx={{ height: '60px' ,width:'150px', marginTop: '50px'}} 
			        	 onClick={() => createGroup()}
			            fullWidth >
			            Create group
			          </Button>
			        </Grid>
			        <Grid item xs={5}>
			        </Grid>
			      </Grid>

	        	</Grid>
	        </Container>

		</div>
	)
}

export default CreateGroup;

