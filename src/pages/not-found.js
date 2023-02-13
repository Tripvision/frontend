import React from 'react';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <Container maxWidth="sm" sx={{display : 'flex', flexDirection : 'column', justifyContent : 'center', height: '100vh' }}>
                <Box
                    component="img"
                    sx={{
                        margin : '0 auto',
                        height: 150,
                        width: 150,
                        maxHeight: { xs: 150, md: 150 },
                        maxWidth: { xs: 150, md: 150 },
                    }}
                    alt="The house from the offer."
                    src="404.svg"
                />
                <Box
                    sx={{
                        margin : '0 auto',
                    }}
                >
                    <Typography variant='h3' align='center'> 404 Not Found</Typography>
                    <Typography variant='body2' align='center' > Sorry, we can't find that page.</Typography>
                    <Button><Link to='/'>Back to Home Page</Link></Button>
                </Box>
            </Container>
        </div>
    );
};

export default NotFound;