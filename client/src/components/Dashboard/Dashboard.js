import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.scss';
import SidePanel from '../SidePanel/SidePanel';
import { Box, Container } from '@mui/material';
import { FETCH_DASHBOARD_VIEW } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';
import Feed from '../Feed/Feed';
import PostEditor from '../PostEditor/PostEditor';
import Profile from '../Profile/Profile';
import UserRoster from '../UserRoster/UserRoster';
import UserEditor from '../UserEditor/UserEditor';

const API = ApiManager();

const Dashboard = () => {

  const [currComp, setcurrComp] = useState('feed')
  const [design, setDesign] = useState([])

  useEffect(() => {
    API.get(FETCH_DASHBOARD_VIEW)
      .then((response) => {
        setDesign(response?.data?.design)
      }, (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login"
        }
        
      })

  }, [])


  return (
    <div className="Dashboard">
      <Box component="main" maxWidth="xl" sx={{ display: 'flex' }}>
        <SidePanel design={design.find((item) => item.id === "sidebar")} />
        <Container component="main" sx={{
          flexGrow: 1,
          height: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>

          <Routes>
            {/* Define routes */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/posteditor" element={<PostEditor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<UserRoster view={"search"} />} />
            <Route path="/userroster" element={<UserRoster view={"userroster"}/>} />
            <Route path="/usereditor" element={<UserEditor />} />
            {/* <Route path="/contact" element={<Contact/>} /> */}
            {/* Not found route - should be at the end */}
            <Route path="/" element={<Feed />} />
          </Routes>
        </Container>
      </Box>
    </div>
  )
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
