import React, { useEffect, useState } from 'react';
import './Login.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from './../../util/Mapper';

const Login = () => {
  let [design, setDesign] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/view/login")
      .then(res => res.json())
      .then(data => { setDesign(data.design) });
  }, []);

  const getActionHandler = (action) => {
    switch (action) {
      case "submit":
        return handleSubmit;
      default:
        break;
    }
  };


  const handleSubmit = (e) => {
    fetch("http://localhost:5500/api/login",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(prepareData)
      })
      .then(function (res) { console.log(res) })
      .catch(function (err) { console.log(err) });
  }

  const prepareData = () => {
    return ({
      username: ''
    })
  }

  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
          <form method={"POST"} onSubmit={handleSubmit}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {
            design && design.map(element =>
              Mapper(element)
            )
          }
        </Box>
          </form>
      </Container>
    </div>
  )
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
