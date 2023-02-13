// Login.js
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'

// Material ui 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

// Constants
import { GOOGLE_AUTH_URL } from '~constants/index';


const LoginScreen = () => {
  // login
  const { isLoggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  // submit

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects/dash-board')
    }
  }, [navigate, isLoggedIn])

  

  return (
    <div className='App'>
      <Container maxWidth="md">
        <Box>
          <Typography align="center">Sign In</Typography>
        </Box>
        <Box>
          <Typography align="center">Your Social Campaings</Typography>
        </Box>

        <Box sx={{ display:'flex'}}>
          
       <Link href={GOOGLE_AUTH_URL} color="inherit">
          <Button sx={{ margin : '0 auto'}}startIcon={<DeleteIcon />}>
            <Typography > Sign in with Google </Typography>
          </Button>
          </Link>
        </Box>
      </Container>
    </div>
  )
}
export default LoginScreen