import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import API_URL from '../../config';

const CityCard = ({ city }) => {
    const { id, name, country, lon, lat } = city;
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleLike = async () => {
        try {
            const url = new URL(`${API_URL}/api/v1/user/find_by_nickname`);
            url.search = new URLSearchParams({ nickname }).toString();

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            const userId = userData.id;

            const likeUrl = new URL(`${API_URL}/api/v1/user/like`);
            likeUrl.search = new URLSearchParams({ user_id: userId, city_id: id }).toString();

            const likeResponse = await fetch(likeUrl, { method: 'PUT' });
            if (!likeResponse.ok) {
                const error = await likeResponse.json();
                setError(error.message);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemoveLike = async () => {
        try {
            const url = new URL(`${API_URL}/api/v1/user/find_by_nickname`);
            url.search = new URLSearchParams({ nickname }).toString();

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            const userId = userData.id;

            const removeLikeUrl = new URL(`${API_URL}/api/v1/user/remove_like`);
            removeLikeUrl.search = new URLSearchParams({ user_id: userId, city_id: id }).toString();

            const removeLikeResponse = await fetch(removeLikeUrl, { method: 'PUT' });
            if (!removeLikeResponse.ok) {
                const error = await removeLikeResponse.json();
                setError(error.message);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h7" component="div" sx={{ padding: '10px', marginBottom: '10px' }}>
                    ID: {id}
                </Typography>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        Name: {name}
                    </Typography>
                </Box>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        Country: {country}
                    </Typography>
                </Box>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        Coordinates: ({lon}, {lat})
                    </Typography>
                </Box>
                <TextField
                    id="nickname"
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <Button variant="contained" onClick={handleLike} size='large' sx={{ marginRight: '10px' }}>
                    Like
                </Button>
                <Button variant="contained" onClick={handleRemoveLike} size='large'>
                    Remove Like
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </CardContent>
        </Card>
    );
};

export default CityCard;