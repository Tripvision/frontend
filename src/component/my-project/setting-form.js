import React, { useEffect, useState } from 'react';
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

import useForm from './use-form';
import { validator } from './setting-validator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchSettingsByProjectId, createSettingsByProjectId, UpdateSettingsByProjectId } from '~features/settings/settings-slice';
import { useDispatch, useSelector } from 'react-redux';
import NotifiType from './NotifiType';
import DatePicker from './date-picker';

export function SettingForm() {
    const { id } = useParams();

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const setting = useSelector(state => state.settings.setting);

    useEffect(() => {
        dispatch(fetchSettingsByProjectId(id));
    }, [])

    const submit = () => {
        if (setting.id) {
            dispatch(UpdateSettingsByProjectId({ id, state, checkedItems }));
        }
        else {
            dispatch(createSettingsByProjectId({ id, state, checkedItems }));
        }
    };



    const { handleChange, handleSubmit, handleBlur, handleClear, handleStatus, handleCheckedItemHandler, 
        state, checkedItems, errors, isSubmited } =
        useForm({
            initState: setting,
            callback: submit,
            validator,
            checkBox : true,
        });


    let isValidForm =
        Object.values(errors).filter(error => typeof error !== 'undefined')
            .length === 0;
    
            

    return (
        <div>
            <Button onClick={() => dispatch(fetchSettingsByProjectId(id))}> Refresh </Button>
            {setting && (
                <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Stack spacing={4}>
                        <Card>
                            <CardContent>
                                <Typography> Project Logo </Typography>
                                <TextField
                                    id='logo'
                                    name='logo'
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
                                />
                                <Box>
                                    {state.logo && <img src={state.logo} alt='preview-img' />}
                                </Box>
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
                                    name='name'
                                    value={state.name || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name ? true : false}
                                    helperText={errors.name}
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
                                    name='type'
                                    value={state.type || '' }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.type ? true : false}
                                    helperText={errors.type}
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
                                    name='description'
                                    value={state.description || '' }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.description ? true : false}
                                    helperText={errors.description}
                                    variant='standard'
                                    margin='dense'
                                    InputProps={{ disableUnderline: true }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography> Due Date </Typography>
                                { handleChange ? <DatePicker state={state} handleChange={handleChange}/> : null }
                            </CardContent>
                        </Card>

                        { /* Checkbox State */}
                        <Card>
                            <CardContent>
                                <Typography> Notifications </Typography>
                                <Box sx={{display : 'flex'}}>
                                    <NotifiType name='email' handleCheckedItemHandler={handleCheckedItemHandler} />
                                    <NotifiType name='phone' handleCheckedItemHandler={handleCheckedItemHandler} />
                                </Box>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography> Status </Typography>
                                <IosSwitch
                                    checked={state.status || false }
                                    name='status'
                                    onChange={handleStatus}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </CardContent>
                        </Card>

                        <Button
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
                            Save on Changes
                        </Button>
                    </Stack>
                    <ToastContainer />
                </Box>
            )}
        </div>
    );

}