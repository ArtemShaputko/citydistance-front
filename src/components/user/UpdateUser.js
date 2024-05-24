import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Background from '../Background.js';

export default function UpdateUser() {
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const resetForm = () => {
        setName('');
        setSurname('');
        setNickname('');
        setEmail('');
        setErrors('');
        setMessage('');
        setIsError(false)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const user = { name, surname, nickname, email };
        console.log(user);
        try {
            const url = new URL("http://localhost:8080/api/v1/user/update");
            url.search = new URLSearchParams({ id }).toString();

            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
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
                setMessage('User updated successfully!');
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
                UPDATE USER
            </Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '20px',
                    '& .MuiTextField-root': { // применяет стили ко всем TextField внутри этого Box
                        width: '50%', // делает все поля ввода на всю ширину родительского элемента
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
                <TextField
                    error={!!errors.name}
                    helperText={errors.name}    
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="surname"
                    label="Surname"
                    error={!!errors.surname}
                    helperText={errors.surname}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    id="nickname"
                    label="Nickname"
                    error={!!errors.nickname}
                    helperText={errors.nickname}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <TextField
                    id="email"
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    gap: '20px', // добавляет расстояние между кнопками
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