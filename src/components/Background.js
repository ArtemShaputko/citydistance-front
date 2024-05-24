import { Container, Paper } from '@mui/material';
import React from 'react';

function Background({ children }) {
    const paperStyle = {
        Padding:'50px',
        width:800,
        margin:'20px auto',
        paddingLeft: '30px', // Добавьте отступ слева
        paddingRight: '30px', // Добавьте отступ справа
    }

    return (
        <Container>
            <Paper square={false} elevation={3} style={paperStyle} sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
                {children}
            </Paper>
        </Container>
    );
}

export default Background;