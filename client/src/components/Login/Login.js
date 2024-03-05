import React, { useEffect, useState } from 'react';
import './Login.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from './../../util/Mapper';
import { AUTH_LOGIN, FETCH_LOGIN_VIEW } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';

const API = ApiManager();
const Login = () => {
  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});


  useEffect(() => {
    API.get(FETCH_LOGIN_VIEW)
      .then((response) => {
        console.log(response);
        setDesign(response?.data?.design)
      }, (error) => {
        console.log(error);
      })

  }, [])


  const getActionHandler = (res) => {
    switch (res?.action) {
      case "submit":
        return handleSubmit(res?.e);
      case "oninputchange":
        return handleInputChange(res?.field, res?.value);
      default:
        break;
    }
  };

  const handleInputChange = (field, value) => {
    setCompData({ ...compData, [field]: value })
  }

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('/login', { username: 'example', password: 'password' });
  //     const { token } = response.data;
  //     setToken(token);
  //     localStorage.setItem('token', token);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  // const handleLogout = () => {
  //   setToken('');
  //   localStorage.removeItem('token');
  // };

  // const handleProtectedRequest = async () => {
  //   try {
  //     const response = await axios.get('/protected', {
  //       headers: {
  //         Authorization: token
  //       }
  //     });
  //     console.log('Protected data:', response.data);
  //   } catch (error) {
  //     console.error('Failed to fetch protected data:', error);
  //     // Handle token expiration or unauthorized access
  //   }
  // };


  // use Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = compData
    if (email && password ) {
      API.post(AUTH_LOGIN, prepareData(compData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response.statusText === 'OK') {
            window.location = "/dashboard"
          } else {
          setDesign(showError(true, response.statusText));
          }
          console.log(response);
        }, (error) => {
          console.log(error);
          setDesign(showError(true, error.message));
        })
    } else {
      setDesign(showError(true, "Incomplete Data"));
    }
  }

  
  const showError = (isShow, msg = null) => {
    let errElement = design.find(item => item.id === "alert");
    errElement.data["display"] = isShow ? "flex" : "none";
    errElement.data["label"] = msg ? msg : "Some Error Occured!";
    return [...design]
  }

  const prepareData = () => {
    const { email, password } = compData
    return ({
      email: email,
      password: password
    })
  }


  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
        <form >
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
                <Mapper
                  element={element}
                  onEvent={(res) => getActionHandler(res)}
                  data={compData} />
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
