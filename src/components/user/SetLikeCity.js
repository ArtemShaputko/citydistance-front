import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Background from '../Background';
import API_URL from '../../config';

export default function SetLikeCity() {
    const [userId, setUserId] = useState('');
    const [cityId, setCityId] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleClick = async (type, address, e) => {
        e.preventDefault();
        try {
            const url = new URL(address);
            url.search = new URLSearchParams({ user_id: userId, city_id: cityId }).toString();

            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            const responseText = await response.text();

            if (response.status === 409) {
                const data = JSON.parse(responseText);
                setErrors(data.fieldErrors);
                setMessage('Wrong data');
            } else if (response.ok) {
                if (type === true) setMessage('City liked successfully');
                else setMessage('City unliked successfully');
                setErrors({});
                setIsError(false);
            } else {
                const data = JSON.parse(responseText);
                const message = data.message;
                setIsError(true);
                setMessage(message);
                setErrors({});
            }
        } catch (error) {
            setIsError(true);
            setMessage('An error occurred');
        }
    };

    return (
        <Background>
            <Typography variant='h4' marginBottom={2} align='center'>
                SET LIKE CITY
            </Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '20px',
                    '& .MuiTextField-root': {
                        width: '50%',
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    error={!!errors.id}
                    helperText={errors.id}
                    id="userId"
                    label="User ID"
                    value={userId}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) > 0)) {
                            setUserId(val);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            return;
                        }
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    type="number"
                />
                <TextField
                    required
                    error={!!errors.city_id}
                    helperText={errors.city_id}
                    id="cityID"
                    label="City ID"
                    value={cityId}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) > 0)) {
                            setCityId(val);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            return;
                        }
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    type="number"
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                        gap: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={(e) => handleClick(true, `${API_URL}/api/v1/user/like`, e)}
                        size='large'
                    >
                        Like
                    </Button>
                    <Button
                        variant="contained"
                        onClick={(e) => handleClick(false, `${API_URL} /api/v1/user/remove_like`, e)}
                        size='large'
                        style={{ backgroundColor: 'red', color: 'white' }}
                    >
                        Remove Like
                    </Button>
                </Box>
                <Typography variant="h6" color={isError ? 'error' : 'success'}>{message}</Typography>
            </Box>
        </Background>
    );
}