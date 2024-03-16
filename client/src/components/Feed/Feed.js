import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Feed.scss';
import { Box, Container, Grid, Link, Toolbar, Typography } from '@mui/material';
import PostCard from '../PostCard/PostCard';
import ApiManager from '../../util/ApiManager';
import { Mapper } from '../../util/Mapper';
import { FETCH_FEED_DATA, FETCH_FEED_VIEW } from '../../util/StringConstants';

const API = ApiManager();

const Feed = () => {

  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  
  useEffect(() => {
    Promise.all([
      API.get(FETCH_FEED_VIEW),
      API.post(FETCH_FEED_DATA, {})
    ]).then((responses) => {
      setDesign(responses[0]?.data?.design)
      setCompData(responses[1]?.data?.data)
    }, (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/login"
      }
      
    })

  }, [])

  return (
    <div className="Feed">
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box alignItems={"center"}>

          {
            design && design.map(element => <Mapper
              element={element}
              data={compData}
              options={{ paginationModel: paginationModel, setPaginationModel: setPaginationModel }} />)

          }
        </Box>
      </Container>
    </div>
  )
};

Feed.propTypes = {};

Feed.defaultProps = {};

export default Feed;
