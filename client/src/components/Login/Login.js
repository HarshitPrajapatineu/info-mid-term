import React, { useContext, useEffect, useState } from 'react';
import './Login.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from './../../util/Mapper';
import { AUTH_LOGIN, FETCH_LOGIN_VIEW } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';
import { AuthContext } from '../../util/AuthContext';
import { Navigate } from 'react-router-dom';

const API = ApiManager();

const Login = () => {

  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});

  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("lastname")) {
      window.location.href = "/dashboard/feed"
    }
    API.get(FETCH_LOGIN_VIEW)
      .then((response) => {
        
        setDesign(response?.data?.design)
      }, (error) => {
        if(error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login"
        }
        
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


  // use Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = compData

    if (email && password) {
      API.post(AUTH_LOGIN, prepareData(compData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response?.statusText === 'OK') {
            const { token, userId, userrole, email, lastname } = response?.data?.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userrole", userrole);
            localStorage.setItem("email", email);
            localStorage.setItem("lastname", lastname);
            login({
              userId: userId,
              userrole: userrole,
              email: email,
              lastname: lastname
            });

          } else {
            setDesign(showError(true, response?.statusText));
          }
          
        }, (error) => {
          if(error.response?.status === 401 || error.response?.status === 403) {
            localStorage.clear();
            window.location.href = "/login"
          }
          
          setDesign(showError(true, error.message));
        }).finally(() =>
          window.location.href = "/dashboard/feed")
    } else {
      setDesign(showError(true, "Incomplete Data"));
    }
  }

  // Log out method
  const handleLogout = async () => {

  };

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
