import React, { useEffect, useState } from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import{Mapper} from './../../util/Mapper';

const Login = () => {
  let [design, setDesign] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/view/login")
      .then(res => res.json())
      .then(data => { setDesign(data.design) });
  }, [])

  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {
              design && design.map(element => Mapper(element))
            }
          </Box>
        </Box>
      </Container>
    </div>
  )
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
