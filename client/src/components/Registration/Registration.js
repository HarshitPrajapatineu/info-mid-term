import React, { useEffect, useState } from 'react';
import './Registration.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from '../../util/Mapper';
import ApiManager from '../../util/ApiManager';
import { FETCH_REGISTRATION_VIEW, REGISTER_USER } from '../../util/StringConstants';

const API = ApiManager();

const Registration = () => {
  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});

  useEffect(() => {
    API.get(FETCH_REGISTRATION_VIEW)
      .then((response) => {
        console.log(response);
        setDesign(response?.data?.design)
      }, (error) => {
        if(error.response.status === 401 || error.response.status === 403) {
          localStorage.clear();
          window.location.href = "/login"
        }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, cnfemail } = compData
    if (firstname && lastname && email && password && (email === cnfemail)) {
      API.post(REGISTER_USER, prepareData(compData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response.statusText === 'OK') {
            window.location.href = "/login"
          }
          console.log(response);
        }, (error) => {
          if(error.response.status === 401 || error.response.status === 403) {
            localStorage.clear();
            window.location.href = "/login"
          }
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
    const { firstname, lastname, email, password } = compData
    return ({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    })
  }

  return (
    <div className="Registration">
      <Container component="main" maxWidth="xs">
        <form>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {
              design && design.map(element => <Mapper element={element} onEvent={(res) => getActionHandler(res)} data={compData} />)
            }
          </Box>
        </form>
      </Container>
    </div>
  )
};

Registration.propTypes = {};

Registration.defaultProps = {};

export default Registration;
