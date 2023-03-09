import React, { useEffect, useState , useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IosSwitch } from '~component/core/ios-switch';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createSettingsByMemberId } from '~features/settings/settings-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import useForm from '~component/my-project/use-form';


import NotifiType from '~component/my-project/NotifiType';
import DatePicker from '../../../component/my-project/date-picker';
import { validator } from '~component/my-project/setting-validator';
import StatusRadio from '../../../component/project/status-radio';

export default function NewSettingForm() {

    
    console.log("Parent render")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setting = useMemo(() => {
        return {
            projectLogoUrl: "",
            projectName: "",
            projectType: "",
            status: "",
            projectDescription: "",
            projectDueDate: "",
            projectNotificationType: ""
        }
    },[])
    

    const saveImgFile = useCallback(() => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
    })
    const submit = () => {
        const result = {
            ...state,
            ['projectNotificationType'] : [...checkedItems]   
        }
        dispatch(createSettingsByMemberId(result));
    };

    const { handleChange, handleSubmit, handleBlur, handleClear, handleStatus, handleCheckedItemHandler,
        state, checkedItems, errors, isSubmited } =
        useForm({
            initState: setting,
            callback: submit,
            validator,
            checkBox: true,
            saveImgFile : saveImgFile
        });

    let isValidForm =
        Object.values(errors).filter(error => typeof error !== 'undefined')
            .length === 0;


    const imgRef = useRef();

    // 이미지 업로드 input의 onChange


    return (
        <Box
            sx={{ mt: 3 }}
        >
            {setting && (
                <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Stack spacing={4}>
                        <Card>
                            <CardContent>
                                <Typography> Project Logo </Typography>
                                <Avatar sx={{ width : '150px', height : '100px' }} src={state.projectLogoUrl ? state.projectLogoUrl : `/images/icon/user.png`}
                                    alt="projectLogoUrl"
                                />
                                <label className="signup-profileImg-label" htmlFor="projectLogoUrl">프로젝트 로고 추가</label>
                                <Box sx={{ display: 'none' }}>
                                    <TextField
                                        id='projectLogoUrl'
                                        name='projectLogoUrl'
                                        type='file'
                                        className='image_box'
                                        accept='image/*'
                                        inputProps={{ accept: 'image/*' }}
                                        InputProps={{ disableUnderline: true }}
                                        hidden
                                        fullWidth
                                        // value={state.logo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.logo ? true : false}
                                        variant='standard'
                                        ref={imgRef}
                                    />
                                </Box>
                                {
                                    state.logo && <Box>
                                        <Avatar
                                            sx={{ width: 200, height: 150 }}
                                            src={state.logo}
                                            alt='preview-img'

                                        />
                                    </Box>
                                }
                                <Typography> Allow Types : png, jpg, jpeg. </Typography>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography> Project Name </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    type='text'
                                    name='projectName'
                                    id='projectName'
                                    value={state.projectName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.projectName ? true : false}
                                    helperText={errors.projectName}
                                    variant='standard'
                                    InputProps={{ disableUnderline: true }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography> Project Type </Typography>
                                <TextField
                                    required
                                    type='text'
                                    fullWidth
                                    name='projectType'
                                    id='projectType'
                                    value={state.projectType || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.projectType ? true : false}
                                    helperText={errors.projectType}
                                    variant='standard'
                                    margin='dense'
                                    InputProps={{ disableUnderline: true }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography> Project Description </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    type='text'
                                    name='projectDescription'
                                    id='projectDescription'
                                    value={state.projectDescription || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.projectDescription ? true : false}
                                    helperText={errors.projectDescription}
                                    variant='standard'
                                    margin='dense'
                                    InputProps={{ disableUnderline: true }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography> Due Date </Typography>
                                {handleChange ? <DatePicker state={state} handleChange={handleChange} /> : null}
                            </CardContent>
                        </Card>

                        { /* Checkbox State */}
                        <Card>
                            <CardContent>
                                <Typography> Notifications </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <NotifiType name='email' handleCheckedItemHandler={handleCheckedItemHandler} />
                                    <NotifiType name='phone' handleCheckedItemHandler={handleCheckedItemHandler} />
                                </Box>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography> Status </Typography>
                                <StatusRadio
                                    status={state.status || 'YET'}
                                    name='status'
                                    handleStatus={handleStatus}
                                />
                            </CardContent>
                        </Card>
                        <Box
                            sx={{
                                display: 'flex'

                            }}>
                            <Box
                                sx={{
                                    marginLeft: 'auto',
                                }}>
                                <Button
                                    sx={{ mr: 3 }}
                                    onClick={handleClear}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Discard
                                </Button>
                                <Button
                                    disabled={!isValidForm && isSubmited}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Stack>
                    <ToastContainer />
                </Box>
            )}
        </Box>
    );

}