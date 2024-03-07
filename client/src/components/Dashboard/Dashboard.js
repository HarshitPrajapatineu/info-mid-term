import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import SidePanel from '../SidePanel/SidePanel';
import { Box, Container, Grid, Link, Paper, Toolbar, Typography, toolbarClasses } from '@mui/material';

const Dashboard = () => {


  return (
    <div className="Dashboard">
      <Box component="main" maxWidth ="lg" sx={{ display: 'flex' }}>
        <SidePanel />
        <Container component="main" sx={{
          flexGrow: 1,
          height: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>
          {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart }
              <Grid item xs={12} md={8} lg={9}>

              </Grid>
              {/* Recent Deposits }
              <Grid item xs={12} md={4} lg={3}>

              </Grid>
              {/* Recent Orders }
              <Grid item xs={12}>

              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" >
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container> */}
        </Container>
      </Box>
    </div>
  )
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
