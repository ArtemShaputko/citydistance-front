import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const UserCard = ({ user }) => {
    const { id, name, surname, nickname, email } = user;

    return (
        <Card sx={{ minWidth: 275}}>
            <CardContent>
                <Typography variant="h7" component="div" sx={{ padding: '10px', marginBottom: '10px' }}>
                    ID: {id}
                </Typography>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        {name} {surname}
                    </Typography>
                </Box>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        Nickname: {nickname}
                    </Typography>
                </Box>
                <Box sx={{ padding: '10px', marginBottom: '10px', border: '1px solid #808080', borderRadius: '10px' }}>
                    <Typography variant="h7" component="div">
                        Email: {email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;