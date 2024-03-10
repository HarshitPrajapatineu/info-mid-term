import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './NavBar.scss';
import ApiManager from '../../util/ApiManager';
import { AuthContext } from '../../util/AuthContext';
import { AUTH_LOGOUT } from '../../util/StringConstants';

const API = ApiManager()

const NavBar = () => {

  const { sessionData, logout } = useContext(AuthContext);
  const [lastname, setLastname] = useState(localStorage.getItem("lastname"));
  // const [session, setSession] = useState();

  const handleLogoutClick = () => {
    try {

      // await axios.post('/logout');
      API.get(AUTH_LOGOUT).then(response => {
        // Clear the token from the client-side
        logout();
        localStorage.clear();
        setLastname(null);
      }).finally(() =>
        window.location.href = "/login");

    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const handleLoginClick = () => {
    window.location.href = "/login";
  }

  const handleRegisterClick = () => {
    window.location.href = "/register";

  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/dashboard/feed"
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
          (lastname) ?
            <>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/dashboard/profile"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Hi, {lastname}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
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
