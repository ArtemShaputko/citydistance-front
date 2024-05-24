import { Typography } from '@mui/material';
import React from 'react';
import Background from '../components/Background';

function Home() {
    return (
        <Background>
            <Typography variant="h4" component="h1" align='center' marginBottom={2}>
                Welcome to CITYDISTANCE project
            </Typography>
            <br />
            <Typography variant="body1" component="p">
                This site gives quick access to our database,
                where you can calculate the distance between two cities, add users, cities and sights
                and set users to like citites.
            </Typography>
        </Background>
    );
}

export default Home;