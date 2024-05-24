import React, { useState } from 'react';
import CityCard from './CityCard';
import { Button, Box, TextField, Typography, Grid, Pagination } from '@mui/material';
import Background from '../Background';
import API_URL from '../../config';

const GetCity = () => {
    const [cities, setCities] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState(false);
    const [page, setPage] = useState(1);
    const [currentUrl, setCurrentUrl] = useState(null);

    const fetchCity = async () => {
        setCities([]);
        setNameError(false);
        setError('');
        if (!name) {
            setNameError(true);
            return;
        }
        try {
            const url = new URL(`${API_URL}/api/v1/city/find_by_name`);
            url.search = new URLSearchParams({ name }).toString();
            setCurrentUrl(url);

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const cityData = await response.json();
            setCities(cityData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAllCities = async () => {
        setPage(0);
        setError('');
        setNameError(false);
        try {
            const url = new URL(`${API_URL}/api/v1/city/all`);
            url.search = new URLSearchParams().toString();
            setCurrentUrl(url);
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const citiesData = await response.json();
            setCities(citiesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePageChange = async (event, value, properUrl) => {
        console.log('page: ', page, ' value: ', value);
        setPage(value - 1);
        setError('');
        setNameError(false);
        try {
            const url = new URL(properUrl);
            let params = new URLSearchParams(url.search);
            params.append("page_number", value - 1);
            url.search = params.toString();
            const response = await fetch(url);
            console.log(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const citiesData = await response.json();
            setCities(citiesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Background>
            <Typography variant='h4' marginBottom={2} align='center'>
                FIND CITY
            </Typography>
            <Box>
                <TextField
                    required
                    id="name"
                    label="Name"
                    value={name}
                    error={nameError}
                    helperText={nameError && 'Name cannot be empty'}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <Grid container justifyContent="center" sx={{ marginBottom: '10px' }}>
                    <Button variant="contained" onClick={fetchCity} size='large' sx={{ marginRight: '10px' }}>
                        Find
                    </Button>
                    <Button variant="contained" onClick={fetchAllCities} size='large'>
                        Find All
                    </Button>
                </Grid>
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ '& > :not(:last-child)': { marginBottom: '20px' } }}>
                    {cities.map((city, index) => <CityCard key={index} city={city} />)}
                </Box>
                {currentUrl !== null && (
                    <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                        <Pagination count={10} page={page + 1} onChange={(e, value) => handlePageChange(e, value, currentUrl)} />
                    </Grid>
                )}
            </Box>
        </Background>
    );
};

export default GetCity;