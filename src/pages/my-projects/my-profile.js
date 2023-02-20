import React, { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import PositionSelectBox from '~component/core/position-select-box';
// pages

const MyProfile = () => {
    const [user, setUser] = useState({
        name: 'lee sang min',
        phoneNumber: '1098305559',
        company: 'Cold Design',
        positionArr : [],
        email : '',
        profileUrl : '',
    });

    // const user = useSelector(state => state.auth.users);

    useEffect(() => {
        // 유저 값 가져오기
        // dispatch(fetchMe());
    }, []);

    useEffect(() => {
        console.log(user);
    })

    return (
        <Container sx={{mt : 3, height : '100%' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant='h5' color='text.secondary'>
                        Profile Details
                    </Typography>
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={2}
                    >
                        <Box>
                            <TextField
                                sx={{ mr: 3 }}
                                required
                                name='name'
                                id='outlined-required'
                                label='name'
                            // value
                            />
                            <TextField
                                required
                                name='phoneNumber'
                                id='outlined-required'
                                label='phoneNumber'
                            // value
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                name='email'
                                id='outlined-required'
                                label='email'
                            // value
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                name='profileUrl'
                                id='outlined-required'
                                label='profileUrl'
                            // value
                            />
                        </Box>
                        <Box>
                            <PositionSelectBox
                                user={user}
                                setUser={setUser}
                            />
                        </Box>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button size='small'>DisCard</Button>
                    <Button size='small'>Save Changes</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default MyProfile;