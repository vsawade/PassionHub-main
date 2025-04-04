// RegisterUser.tsx
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../CSS/RegisterAndLogin.css';// Import the CSS file for styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Preferences from './Preferences';
import { loginSuccess } from '../redux/auth/authActions';
interface registerCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}
// RegisterUser component is the registration page of the application
const RegisterUser: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerCredentials, setRegisterCredentials] = useState<registerCredentials>(
    {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  );
  const [isError, setIsError] = useState(false);

  // Handle register function to make API call to register
  const handleRegister = async ()=>{
    try{
      const response = await fetch('/api/users/register',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json',
        },
        body: JSON.stringify(registerCredentials),
      });
      if(response.ok){
        const data= await response.json();
        dispatch(loginSuccess({
          userId: data.user._id, 
          username: data.user.username, 
          upvotes: data.user.upvotes, 
          upvotesGiven: data.user.upvotesGiven, 
          wallet: data.user.wallet, 
          profilePicture: data.user.profilePicture
        }));
        navigate('/preferences/'+data.user._id);
      }
      else {
        setIsError(true);
      }
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div className='registration-page'>
      <div className="register-user-container">
        <div className="left-half">
          <img src="/passion3.png" alt="" />
          <h1 className="passion-hub">PassionHub</h1>
          <p className="tagline">Connect with Like Minds, Fuel Your Passion</p>
        </div>
        <div className="right-half-register">
          <h2>Join us for free !</h2>
          <form className="form-style">
          
          <TextField id="Email Address" label="Email Address" type="email" variant="filled" fullWidth  
            onChange={(e) => setRegisterCredentials({
              ...registerCredentials,
              email: e.target.value,
            })} />
          <TextField id="Username" label="Username" variant="filled" fullWidth  
            onChange={(e) => setRegisterCredentials({
              ...registerCredentials,
              username: e.target.value,
            })} />
          <TextField id="Password" label="Password" type="password" variant="filled" fullWidth 
            onChange={(e) => setRegisterCredentials({
              ...registerCredentials,
              password: e.target.value,
            })} />
            <div className="registerBtn"><Button variant="contained" color="success" fullWidth onClick={handleRegister}>
                Register
              </Button></div> 
          </form>
          <p className="register-text">Already have an account? Click <Link to="/login">here</Link> to sign in.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
