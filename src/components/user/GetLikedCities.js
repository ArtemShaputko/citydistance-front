import React, { useState } from 'react';
import CityCard from '../city/CityCard';
import { Button, Box, TextField, Typography, Grid, Pagination } from '@mui/material';
import Background from '../Background';
import API_URL from '../../config';

const GetLikedCities = () => {
    const [cities, setCities] = useState([]);
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [idError, setIdError] = useState(false);
    const [page, setPage] = useState(1);

    const fetchAllUsers = async () => {
        setPage(0);
        setError('');
        setIdError(false);
        if (!nickname) {
            setIdError(true);
            setError('Nickname can`t be empty');
            return;
        }
        try {
            const url = new URL(`${API_URL}/api/v1/user/liked_cities`);
            url.search = new URLSearchParams({ nickname: nickname }).toString();
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const citiesData = await response.json();
            console.log(citiesData);
            setCities(citiesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePageChange = async (event, value) => {
        console.log('page: ', page, ' value: ', value);
        setPage(value - 1);
        setError('');
        setIdError(false);
        if (!nickname) {
            setIdError(true);
            return;
        }
        try {
            const url = new URL(`${API_URL}/api/v1/user/liked_cities`);
            url.search = new URLSearchParams({ nickname: nickname, page_number: value - 1 }).toString();
            const response = await fetch(url);
            console.log('here');
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const citiesData = await response.json();
            setCities(citiesData);
            if (citiesData.length === 0) {
                setError('No liked cities found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Background>
            <Typography variant='h4' marginBottom={2} align='center'>
                GET LIKED CITIES
            </Typography>
            <Box>
                <TextField
                    required
                    id="nickname"
                    label="Nickname"
                    value={nickname}
                    error={idError}
                    helperText={idError && error}
                    onChange={(e) => setNickname(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <Grid container justifyContent="center" sx={{ marginBottom: '10px' }}>
                    <Button variant="contained" onClick={fetchAllUsers} size='large' sx={{ marginRight: '10px' }}>
                        Get
                    </Button>
                </Grid>
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ '& > :not(:last-child)': { marginBottom: '20px' } }}>
                    {cities.map((city, index) => <CityCard key={index} city={city} />)}
                </Box>
                {cities.length > 0 && (
                    <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                        <Pagination count={10} page={page + 1} onChange={handlePageChange} />
                    </Grid>
                )}
            </Box>
        </Background>
    );
};

export default GetLikedCities;