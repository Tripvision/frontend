import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import OnePositionSelectBox from '~component/core/one-position-select-box';
import { updateMyProfile } from '~features/auth/auth-slice';
// pages

const MyProfile = () => {

    const dispatch = useDispatch();
    const loaduser = useSelector(state => state.auth.userInfo);
    const imgRef = useRef();
    const [user, setUser] = useState({
        ...loaduser,
    });
    
    useEffect(() => {
        console.log(user);
    })

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setUser({
                ...user,
                avatarUrl: reader.result
            });
        };
    };
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = _ => {
        console.log(user);
        dispatch(updateMyProfile(user))
    }

    return (
        <Container sx={{ mt: 3, height: '100%' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant='h5' color='text.secondary'>
                        Profile Details
                    </Typography>
                    <form>
                        <Stack
                            direction='column'
                            justifyContent='center'
                            alignItems='flex-start'
                            spacing={2}
                        >
                            <Box>
                                <Avatar sx={{ width : '150px', height : '100px' }} src={user.avatarUrl ? user.avatarUrl : `/images/icon/user.png`}
                                    alt={user.name}
                                />
                                <label className="signup-profileImg-label" htmlFor="profileImg">프로필 이미지</label>
                                <Box sx={{ display: 'none' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="profileImg"
                                        onChange={saveImgFile}
                                        ref={imgRef}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <TextField
                                    sx={{ mr: 3 }}
                                    required
                                    name='nickName'
                                    id='outlined-required'
                                    label='nickName'
                                    onChange={handleChange}
                                    value={user.nickName || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <TextField
                                    sx={{ mr: 3 }}
                                    required
                                    name='name'
                                    id='outlined-required'
                                    label='name'
                                    value={user.name || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    name='phoneNumber'
                                    id='outlined-required'
                                    label='phoneNumber'
                                    value={user.phoneNumber || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    name='email'
                                    id='outlined-required'
                                    label='email'
                                    value={user.email || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    name='avatarUrl'
                                    id='outlined-required'
                                    label='avatarUrl'
                                    value={user.avatarUrl || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <TextField
                                    required
                                    name='registrationDate'
                                    id='outlined-required'
                                    label='registrationDate'
                                    value={user.registrationDate || ''}
                                // value
                                />
                            </Box>
                            <Box>
                                <OnePositionSelectBox
                                    user={user}
                                    setUser={setUser}
                                />
                            </Box>
                            <Box>
                                <PositionSelectBox
                                    user={user}
                                    setUser={setUser}
                                />
                            </Box>
                        </Stack>
                    </form>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ marginLeft: 'auto' }}>
                            <Button size='small' onClick={handleSubmit}>Save</Button>
                            <Button size='small'>DisCard</Button>
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        </Container >
    );
};

export default MyProfile;