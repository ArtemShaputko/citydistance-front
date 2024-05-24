import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MyAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCity, setAnchorElCity] = React.useState(null);
  const [anchorElSight, setAnchorElSight] = React.useState(null);

  const handleMenuOpen = (setAnchorEl) => (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (setAnchorEl) => () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
          CITYDISTANCE
        </Typography>
        <Box flexGrow={1} />
        <Button color="inherit" onClick={handleMenuOpen(setAnchorElUser)}>User</Button>
        <Menu
          id="user-menu"
          anchorEl={anchorElUser}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleMenuClose(setAnchorElUser)}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/edit-user" style={{ color: 'inherit', textDecoration: 'none' }}>Edit user</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/find-user" style={{ color: 'inherit', textDecoration: 'none' }}>Find user</Link>  
          </MenuItem>      
        </Menu>
        <Button color="inherit" onClick={handleMenuOpen(setAnchorElCity)}>City</Button>
        <Menu
          id="city-menu"
          anchorEl={anchorElCity}
          keepMounted
          open={Boolean(anchorElCity)}
          onClose={handleMenuClose(setAnchorElCity)}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/edit-city" style={{ color: 'inherit', textDecoration: 'none' }}>Edit city</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/find-city" style={{ color: 'inherit', textDecoration: 'none' }}>Find city</Link>
          </MenuItem>
        </Menu>
        <Button color="inherit" onClick={handleMenuOpen(setAnchorElSight)}>Sight</Button>
        <Menu
          id="sight-menu"
          anchorEl={anchorElSight}
          keepMounted
          open={Boolean(anchorElSight)}
          onClose={handleMenuClose(setAnchorElSight)}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/edit-sight" style={{ color: 'inherit', textDecoration: 'none' }}>Edit sight</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElUser)}>
            <Link to="/find-sight" style={{ color: 'inherit', textDecoration: 'none' }}>Find sight</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

