import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UserEditor.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from '../../util/Mapper';
import ApiManager from '../../util/ApiManager';
import { FETCH_USER_DATA, FETCH_USER_EDITOR_VIEW, UPDATE_USER } from '../../util/StringConstants';
import { useLocation } from 'react-router-dom';

const API = ApiManager();

const UserEditor = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});
  const editUserId = queryParams.get("id");

  useEffect(() => {
    Promise.all([
    API.get(FETCH_USER_EDITOR_VIEW),
    API.post(FETCH_USER_DATA, {id:editUserId})
  ])      .then((responses) => {
        // console.log(responses);
        setDesign(responses[0]?.data?.design);
        // console.log(responses[1]?.data?.data);
        setCompData(responses[1]?.data?.data);
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

  const handleSubmit = (e) => {
    const { firstname, lastname, email, password, cnfpassword } = compData
    if (firstname && lastname && email && 
      ((!password && !cnfpassword) || ( password && cnfpassword && (password === cnfpassword)))) {
      API.post(UPDATE_USER, prepareData(compData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response?.statusText === 'OK') {
            window.location.href = "/dashboard/profile"
          }
          
        }, (error) => {
          if(error.response?.status === 401 || error.response?.status === 403) {
            localStorage.clear();
            window.location.href = "/login"
          }
          
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
    const { firstname, lastname, email, password,userrole } = compData
    return ({
      _id: editUserId, 
      firstname: firstname,
      lastname: lastname,
      email: email,
      userrole:userrole,
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
              design && design.map(element => <Mapper 
                element={element} 
                onEvent={(res) => getActionHandler(res)} 
                defaultValue={compData[element.id]} 
                data={compData} />)
            }
          </Box>
        </form>
      </Container>
    </div>
  )
};

UserEditor.propTypes = {};

UserEditor.defaultProps = {};

export default UserEditor;
