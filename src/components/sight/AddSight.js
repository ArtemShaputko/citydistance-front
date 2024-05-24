import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Background from '../Background.js';

export default function AddSight() {
    const [name, setName] = React.useState('');
    const [cityId, setCityId] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const resetForm = () => {
        setName('');
        setCityId('');
        setErrors('');
        setMessage('');
        setIsError(false)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const sight = { name };
        console.log(sight);
        try {
            const url = new URL("http://localhost:8080/api/v1/city/sights/add_sight");
            url.search = new URLSearchParams({ city_id: cityId }).toString();

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sight)
            });

            const responseText = await response.text();

            if (response.status === 409) {
                const data = JSON.parse(responseText);
                setErrors(data.fieldErrors);
                setMessage('Wrong data');
                setIsError(true);
            }
            else if (!response.ok) {
                const data = JSON.parse(responseText);
                const message = data.message;
                setMessage(message);
                setIsError(true);
                setErrors({});  
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                console.log(responseText);
                setMessage('Sight saved successfully!');
                setIsError(false); 
                setErrors({});  
            }  
        } catch (error) {
            console.log('Fetch error: ', error);
        }
    }
    return (
        <Background>
            <Typography variant='h4' marginBottom={2} align='center'>
                ADD SIGHT
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
                    error={!!errors.name}
                    helperText={errors.name}    
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    error={!!errors.cityId}
                    helperText={errors.cityId}    
                    id="cityId"
                    label="City ID"
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    gap: '20px',
                }}
            >
                <Button variant="contained" onClick={handleClick} size='large'>Send</Button>
                <Button 
                    variant="contained" 
                    onClick={resetForm} size='large' 
                    style={{ backgroundColor: 'darkblue', color: 'white' }}
                >
                        Reset
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
            >
                <Typography variant="body1" style={{ color: isError ? 'red' : 'black' }}>{message}</Typography> 
            </Box>
        </Background>
    );
}