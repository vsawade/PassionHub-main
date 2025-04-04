import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Grid, Container, Typography } from '@mui/material';
import { useState } from "react";
import '../CSS/PreferenceButton.css'; 
import { useNavigate, useParams } from 'react-router-dom';


type PreferenceButtonProp = {
  children: React.ReactNode;
  id: string;
  preference: string;
  onPreferenceClicked: (preference: string) => boolean;
};

interface PreferencesProps {
  userId: string; // define the userId prop
}

// PreferenceButton is a component that displays a preference button
export const PreferenceButton : React.FC<PreferenceButtonProp> = ({ id, preference, onPreferenceClicked }) => {
  
  const [selected, setSelected] = useState<boolean>(false);
  const [variant, setVariant] = useState<string>('outlined');

  const getRandomPastelColor = (id: string) => {
    let color_id = (parseInt(id) % 5) + 1;
    return ["pastel-color-selected-" + color_id, "pastel-color-unselected-" + color_id];
  }

  const onButtonClick = () => {


    if (!onPreferenceClicked(preference)) {
      return;
    }

    setSelected(!selected);

    if (selected === true) {
      setVariant('contained');
    } else {
      setVariant('outlined');
    }

  }  

  return (
    <div>
      { selected ?
        ( <Button
            className= { getRandomPastelColor(id)[0] }
            sx={{ height: '75px' }}
            variant="contained"

            onClick={() => onButtonClick() } fullWidth >
          { preference }
          </Button> ) :
         ( <Button       

            className= { getRandomPastelColor(id)[1] }
            sx={{ height: '75px' }}
            variant="outlined"
            onClick={() => onButtonClick() }fullWidth  >
          { preference }
        </Button> )
      }
    </div>
  )
}


const Preferences : React.FC<PreferencesProps> = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  
  const addPreference = (preference: string) => {
    // Check if its already present
    let index = selectedPreferences.indexOf(preference);
    if (index >= 0) {
      setSelectedPreferences(selectedPreferences.filter(item => item !== preference));
      return true;
    }

    // check if you have selected more than 3 already
    if (selectedPreferences.length >= 3) {
      alert("You may select only 3 preferences");
      return false;
    }

    setSelectedPreferences([...selectedPreferences, preference])

    return true;
  }

  const submitPreference = async (): Promise<void> => {
    try{
      const requestBody = {
        userId: userId,
        preferences: selectedPreferences,
      };
      const response = await fetch('/api/users/updatePreferences',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      navigate('/home/'+data.updatedUser._id);
    }catch(error){
      console.log(error);
    }
  }

  return (
  <Container>    

    <Container>
      <Grid container spacing={3} columnSpacing={{ xs: 60, sm: 2, md: 3 }}>
        <Grid item xs={12} sx={{ marginTop: '50px' }}>
          <Typography variant="h3">
            What are some things that interest you?
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <Typography variant="h6">
            (Select up to 3 choices)
          </Typography>
        </Grid>

        {/*Row 1*/}
        <Grid item xs={5}>

          <PreferenceButton 
            preference="Sports"
            id="1"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>

        </Grid>
        <Grid item xs={3}>
          <PreferenceButton 
            preference="Music"
            id="2"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>
        <Grid item xs={4}>
          <PreferenceButton 
            preference="Politics"
            id="3"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>

        {/*Row 2*/}
        <Grid item xs={3}>
          <PreferenceButton 
            preference="Movies"
            id="4"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>
        <Grid item xs={5}>
          <PreferenceButton 
            preference="Technology"
            id="5"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>
        <Grid item xs={4}>
          <PreferenceButton 
            preference="Science"
            id="6"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>

        {/*Row 3*/}
        <Grid item xs={4}>
          <PreferenceButton 
            preference="Arts"
            id="7"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>
        <Grid item xs={3}>
          <PreferenceButton 
            preference="Adventure"
            id="8"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>
        <Grid item xs={5}>
          <PreferenceButton 
            preference="Other"
            id="9"
            onPreferenceClicked={addPreference}
            > 
          
          </PreferenceButton>
        </Grid>

      </Grid>


      <Grid container spacing={5}>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={2}>
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            sx={{ height: '75px', marginTop: '30px'}} 
            onClick={() => submitPreference()}
            fullWidth >
            Continue
          </Button>
        </Grid>
        <Grid item xs={5}>
        </Grid>
      </Grid>
    </Container>

  </Container>
  )

  
}

export default Preferences
