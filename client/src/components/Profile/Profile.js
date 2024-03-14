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
      console.log(error);
    })

  }, [])


  const setCompData = (type) => {
    console.log(type);
    switch (type) {
      case "postcardlist":
        return postData

      case "profilecard":
        return userData

      default:
        return userData
    }
  }

  return (
    <div className="Profile">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box alignItems={"center"}>
          {/* <Card sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', padding: "16px" }}>

              <Avatar sx={{ width: 64, height: 64 }} src="/broken-image.jpg" />
            </Box>

            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Admin
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Email@example.com
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center',padding: "16px"}}>

              <Button  variant="contained" startIcon={<Icon>{"edit_icon"}</Icon>}>
                Edit Profile
              </Button>
            </Box>
          </Card> */}

          {
            design && design.map(element => <Mapper
              element={element}
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
