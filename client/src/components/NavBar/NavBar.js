import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './NavBar.scss';
import ApiManager from '../../util/ApiManager';
import { useAuth } from '../../util/AuthContext';
import { AUTH_LOGOUT } from '../../util/StringConstants';

const API = ApiManager()

const NavBar = () => {

  const { sessionData, logout } = useAuth();

  const handleLogoutClick = () => {
    try {
      
      // await axios.post('/logout');
      API.post(AUTH_LOGOUT).then(response => {
        // Clear the token from the client-side
        logout();
      });

    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const handleLoginClick = () => {
    window.location = "/login";
    
  }

  const handleRegisterClick = () => {
    window.location = "/register";

  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            flexGrow: 1
          }}
        >
          ARTH
        </Typography>
        {
          (sessionData.userId) ?
            <>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Hi, {sessionData.lastname}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick()}>Logout</Button>
            </>
            :
            <>
              
              <Button color="inherit" onClick={handleLoginClick}>Login</Button>
              <Button color="inherit" onClick={handleRegisterClick}>Register</Button>
            </>
        }
      </Toolbar>
    </AppBar>
  );
}



// export default ResponsiveAppBar;
NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
