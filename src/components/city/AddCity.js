import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Background from '../Background.js';
import API_URL from '../../config.js';

export default function AddCity() {
    const [name, setName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [lon, setLon] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const resetForm = () => {
        setName('');
        setCountry('');
        setLon('');
        setLat('');
        setErrors('');
        setMessage('');
        setIsError(false)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const city = { name, country, lon, lat };
        console.log(city);
        try {
            const response = await fetch(`${API_URL}/api/v1/city/add_city`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(city)
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
                setMessage('City saved successfully!');
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
                ADD CITY
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
                    id="country"
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                    required
                    id="lon"
                    label="Longitude"
                    error={!!errors.lon}
                    helperText={errors.lon}
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                />
                <TextField
                    required
                    id="lat"
                    label="Latitude"
                    error={!!errors.lat}
                    helperText={errors.lat}
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
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