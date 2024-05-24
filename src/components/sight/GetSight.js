import React, { useState } from 'react';
import SightCard from './SightCard';
import { Button, Box, TextField, Typography, Grid, Pagination } from '@mui/material';
import Background from '../Background';

const GetSight = () => {
    const [sights, setSights] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState(false);
    const [page, setPage] = useState(1);
    const [currentUrl, setCurrentUrl] = useState(null);

    const fetchSight = async () => {
        setSights([]);
        setNameError(false);
        setError('');
        if (!name) {
            setNameError(true);
            return;
        }
        try {
            const url = new URL('http://localhost:8080/api/v1/city/sights/find_by_name');
            url.search = new URLSearchParams({ name }).toString();
            setCurrentUrl(url);

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const sightData = await response.json();
            setSights(sightData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAllSights = async () => {
        setPage(0);
        setError('');
        setNameError(false);
        try {
            const url = new URL('http://localhost:8080/api/v1/city/sights/all');
            url.search = new URLSearchParams().toString();
            setCurrentUrl(url);
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const sightsData = await response.json();
            setSights(sightsData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePageChange = async (event, value, properUrl) => {
        console.log('page: ', page, ' value: ', value);
        setPage(value-1);
        setError('');
        setNameError(false);
        try {
            const url = new URL(properUrl);
            let params = new URLSearchParams(url.search);
            params.append("page_number", value-1);
            url.search=params.toString();
            const response = await fetch(url);
            console.log(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message || 'Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const sightsData = await response.json();
            setSights(sightsData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Background>
            <Typography variant='h4' marginBottom={2} align='center'>
                FIND SIGHT
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
                    <Button variant="contained" onClick={fetchSight} size='large' sx={{ marginRight: '10px' }}>
                        Find
                    </Button>
                    <Button variant="contained" onClick={fetchAllSights} size='large'>
                        Find All
                    </Button>
                </Grid>
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ '& > :not(:last-child)': { marginBottom: '20px' } }}>
                    {sights.map((sight, index) => <SightCard key={index} sight={sight} />)}
                </Box>
                    {currentUrl !== null && (
                        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                            <Pagination count={10} page={page+1} onChange={(e, value) => handlePageChange(e, value, currentUrl)} />
                        </Grid>
                    )}
                </Box>
        </Background>
    );
};

export default GetSight;