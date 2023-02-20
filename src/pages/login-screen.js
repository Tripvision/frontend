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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';


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


    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography align="center" variant="h4" sx={{ textAlign: 'cetner', mb: 1.5 }} color='text.secondary'>
          Sign In
        </Typography>
        <Typography align="center" variant='body2'>
          Your Social Campaigns
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={GOOGLE_AUTH_URL} color="inherit">
          <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mr: 3 }}>
            Sign in with Google
          </Button>
        </Link>
        <Button href="https://apple.com" target="_blank" variant="outlined" startIcon={<AppleIcon />} >
          Sign in with Apple
        </Button>
      </CardActions>
    </Card>
  )
}
export default LoginScreen