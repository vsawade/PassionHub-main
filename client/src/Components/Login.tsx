// LoginForm.tsx
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../CSS/RegisterAndLogin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../redux/auth/authActions';

interface loginCredentials {
  email: string;
  password: string;
}


// Login component is the login page of the application
const Login: React.FC = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginCredentials, setLoginCredentials] = useState<loginCredentials>({
      email: '',
      password: ''
    });
    const [isError, setIsError] = useState(false);


// Handle login function to make API call to login
const handleLogin = async () => {
  dispatch(loginRequest());
  try {
    console.log("=======LOGIN CREDENTIALS"+loginCredentials.email);
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginCredentials),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(loginSuccess({
        userId: data.user._id, 
        username: data.user.username, 
        upvotes: data.user.upvotes, 
        upvotesGiven: data.user.upvotesGiven, 
        wallet: data.user.wallet, 
        profilePicture: data.user.profilePicture
      }));
      navigate('/home/' + data.user._id);
    }else {
      dispatch(loginFailure());
      setIsError(true);
    }
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};

    return (
      <div className='login-page'>
        <div className="login-form-container">
          <div className="left-half">
            <img src="/passion3.png" alt="" />
            <h1 className="passion-hub">PassionHub</h1>
            <p className="tagline">Connect with Like Minds, Fuel Your Passion</p>
          </div>
          <div className="right-half-login">
            <h2>Welcome Back !</h2>
            <form className="form-style">
              <TextField id="Email" label="Email" variant="filled" fullWidth
                onChange={(e) => setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })} />
              <TextField id="Password" label="Password" type="password" variant="filled" fullWidth
                onChange={(e) => setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })} />
              <div className="signInBtn">
                <Button variant="contained" color="success" fullWidth onClick={handleLogin}>
                  Sign In
                </Button>
              </div>
              <div>
                <p className="errorMsg">{isError ? 'Incorrect email or password!' : ''}</p>
              </div>
            </form>
            <p className="register-text">Don't have an account? Click <Link to="/register">here</Link> to register.</p>
          </div>
        </div>
      </div>
    );
  };

export default Login;
