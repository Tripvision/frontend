// Login.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'

// Material ui 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';



// Constants
import { GOOGLE_AUTH_URL } from '~constants/index';
import { isEmptyObj } from '../utils/object-utils';


const LoginScreen = () => {
  // login
  const userInfo = useSelector((state) => state.auth.userInfo)
  const navigate = useNavigate();

  // submit

  // redirect authenticated user to profile screen
  useEffect(() => {
    const isLogin = isEmptyObj(userInfo);
    console.log(isLogin)
    if ( isLogin === false ) {
      navigate('/projects/dash-board')
    }
  }, [navigate, userInfo])

  return (


    <Card sx={{ minWidth: 275, mt: 3 }}>
      <CardContent>
        <Typography align="center" variant="h4" sx={{ textAlign: 'cetner', mb: 1.5 }} color='text.secondary'>
          Sign In
        </Typography>
        <Typography align="center" variant='body2'>
          Your Social Campaigns
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button href={GOOGLE_AUTH_URL} variant="outlined" startIcon={<AppleIcon />} >
            Sign in with Google
          </Button>
          <Button href="https://apple.com" target="_blank" variant="outlined" startIcon={<AppleIcon />} >
            Sign in with Apple
          </Button>
        </Stack>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  )
}
export default LoginScreen