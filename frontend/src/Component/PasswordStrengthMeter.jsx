import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

function PasswordStrengthMeter({strength}) {

    const getStrengthLabel = (strength) => {
        switch (strength) {
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Moderate';
            case 4:
                return 'Strong';
            case 5:
                return 'Very Strong';
            default:
                return 'Too Short';
        }
    };

    return (

            <Box sx={{ mt: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={(strength / 5) * 100}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#555',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#64dd17',  // Change this color to whatever you need
                        },
                      }}
                />
                <Typography sx={{ color: '#fff', textAlign: 'end', fontSize: 9, mt: 1 }}>
                    {getStrengthLabel(strength)}
                </Typography>
            </Box>

    );
}

export default PasswordStrengthMeter;
