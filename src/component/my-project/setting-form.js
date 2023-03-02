import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

import useForm from './use-form';
import { validator } from './setting-validator';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchSettingsByProjectId, DeleteSettingsByProjectId, UpdateSettingsByProjectId, createSettingsByMemberId } from '~features/settings/settings-slice';
import { useDispatch, useSelector } from 'react-redux';
import NotifiType from './NotifiType';
import DatePicker from './date-picker';
import { Avatar } from '@mui/material';
import StatusRadio from '../project/status-radio';
import { isEmptyObj } from '../../utils/object-utils';

export function SettingForm() {
    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const setting = useSelector(state => state.settings.setting);
    const isEmptyObj = useCallback(
        obj => {
            if (obj.constructor === Object
                && Object.keys(obj).length === 0) {
                return true;
            }
            return false;
        },
        []
    );

    useEffect(() => {
        dispatch(fetchSettingsByProjectId(id));
    }, [dispatch])

    const submit = () => {
        const result = {
            ...state,
            ['projectNotificationType']: [...checkedItems]
        }
        console.log(result);
        dispatch(UpdateSettingsByProjectId({ id: id, setting: result }));
    };

    const hadleDelete = () => {
        dispatch(DeleteSettingsByProjectId(id));
    }

    const { handleChange, handleSubmit, handleBlur, handleClear, handleStatus, handleCheckedItemHandler,
        state, checkedItems, errors, isSubmited } =
        useForm({
            initState: setting,
            callback: submit,
            validator,
            checkBox: true,
        });

    let isValidForm =
        Object.values(errors).filter(error => typeof error !== 'undefined')
            .length === 0;


    return (
        <Box
            sx={{ mt: 3 }}
        >
            <span> 아니 왜 </span>
            {isEmptyObj(setting) === false ?
                <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Stack spacing={4}>
                        <Card>
                            <CardContent>
                                <Typography> Project Logo </Typography>
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
                                    id='projectType'
                                    name='projectType'
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
                                    id='projectDescription'
                                    name='projectDescription'
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
                                <DatePicker state={state} handleChange={handleChange} />
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
                            <Box>
                                <Button
                                    // disabled={!isValidForm && isSubmited}
                                    variant='contained'
                                    color='error'
                                >
                                    onClick={hadleDelete}

                                    Delete Project
                                </Button>
                                x

                            </Box>
                            <Box
                                sx={{
                                    marginLeft: 'auto',
                                }}>
                                <Button
                                    sx={{ mr: 3 }}
                                    onClick={handleClear}
                                    variant='contained'
                                    color='primary'
                                >
                                    Discard
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    // disabled={!isValidForm && isSubmited}
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
                : null
            }
        </Box>
    );

}