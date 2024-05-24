import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Background from '../Background';
import API_URL from '../../config';

export default function DeleteSight() {
    const [id, setId] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const url = new URL(`${API_URL}/api/v1/city/sights/remove`);
            url.search = new URLSearchParams({ id }).toString();

            const response = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            const responseText = await response.text();

            if (response.status === 409) {
                const data = JSON.parse(responseText);
                setErrors(data.fieldErrors);
                setMessage('Wrong data');
            } else if (response.ok) {
                setMessage('Sight deleted successfully');
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
                DELETE SIGHT
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
                    id="id"
                    label="ID"
                    value={id}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) > 0)) {
                            setId(val);
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
                    <Button variant="contained" onClick={handleClick} size='large'>Delete</Button>
                </Box>
                <Typography variant="h6" color={isError ? 'error' : 'success'}>{message}</Typography>
            </Box>
        </Background>
    );
}