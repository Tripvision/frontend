import React, { useState } from 'react';

// Material ui 

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box'


// checked 수정
const CheckBoxCard = () => {

    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
    }

    return (
        <div>
            <Card sx={{ minWidth: 200, minHeight: 135 }}>
                <CardActionArea onClick={handleChange} >
                    <CardContent>
                        <Box sx={{ display: 'flex' }}>
                            <Box >
                                <Typography sx={{ mb: 1.5 }} >
                                    Precise Usage
                                </Typography>
                                <Typography sx={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    maxWidth: '200px',
                                }}
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    Withdraw money to your bank account per transaction under  $50,000 budget
                                </Typography>
                            </Box>
                            <Box>
                                <Checkbox
                                    style={{
                                        transform: "scale(1)",
                                    }}
                                    color="secondary"
                                    required
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Box>
                        </Box>
                    </CardContent>

                </CardActionArea>
            </Card >
        </div>
    );
};

export default CheckBoxCard;