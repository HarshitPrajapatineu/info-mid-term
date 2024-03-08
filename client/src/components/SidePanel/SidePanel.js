import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Icon, List, Toolbar } from '@mui/material';


const drawerWidth = 240;

const SidePanel = ({ design }) => {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {design?.data?.itemList.map((item) => (
              (item.name === "divider") ?
                <Divider />
                :
                <ListItem key={item.name} disablePadding>
                  <ListItemButton onClick={()=> window.location.href = "/dashboard/" + item.route}>
                    <ListItemIcon>
                      <Icon>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
};

SidePanel.propTypes = {};

SidePanel.defaultProps = {};

export default SidePanel;
