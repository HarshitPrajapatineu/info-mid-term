import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { FETCH_PROFILE_VIEW, FETCH_USER_DATA, FETCH_USER_POSTS } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';
import { Avatar, Box, Button, Card, CardContent, Container, Icon, IconButton, Stack, Typography } from '@mui/material';
import { Mapper } from '../../util/Mapper';

const API = ApiManager();

const Profile = () => {

  let [design, setDesign] = useState([]);
  let [userData, setUserData] = useState([]);
  let [postData, setPostData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    Promise.all([
      API.get(FETCH_PROFILE_VIEW),
      API.get(FETCH_USER_DATA),
      API.get(FETCH_USER_POSTS)
    ]).then((responses) => {
      setDesign(responses[0]?.data?.design)
      setUserData(responses[1]?.data?.data)
      setPostData(responses[2]?.data?.data)
    }, (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/login"
      }
      
    })

  }, [])


  const setCompData = (type) => {
    // console.log(type);
    switch (type) {
      case "postcardlist":
        return postData

      case "profilecard":
        return userData

      default:
        return userData
    }
  }

  
  const getActionHandler = (res) => {
    switch (res?.action) {
      case "edit":
        return handleEditButton(res?.id);
      default:
        break;
    }
  };

  

  const handleEditButton = (id) => {
    window.location.href = "/dashboard/usereditor?id=" + id;
  }

  return (
    <div className="Profile">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box alignItems={"center"}>
          {
            design && design.map(element => <Mapper
              element={element}
              onEvent={(res) => getActionHandler(res)}
              data={setCompData(element.type)}
              options={{ paginationModel: paginationModel, setPaginationModel: setPaginationModel }} />)

          }
        </Box>
      </Container >
    </div >
  )
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
