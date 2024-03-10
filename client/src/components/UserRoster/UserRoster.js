import React, { useEffect, useState } from 'react';
import './UserRoster.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { FETCH_USER_ROSTER_DATA, FETCH_USER_ROSTER_VIEW } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';
import { Mapper } from '../../util/Mapper';
import { Container } from '@mui/material';

const API = ApiManager();

const UserRoster = () => {

  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});
  useEffect(() => {
    Promise.all([
      API.get(FETCH_USER_ROSTER_VIEW),
      API.post(FETCH_USER_ROSTER_DATA, {})
    ]).then((responses) => {
      console.log(responses);
      setDesign(responses[0]?.data?.design)
      setCompData(responses[1]?.data?.data)
    }, (error) => {
      if (error.response.status === 401) {
        window.location.href = "/login"
      }
      console.log(error);
    })

  }, [])



  const getActionHandler = (res) => {
    switch (res?.action) {
      case "edit":
        return handleEditButton(res?.id);
      case "delete":
        return handleDeleteButton(res?.id);
      case "follow":
        return handleFollowButton(res?.id);
      case "unfollow":
        return handleUnfollowButton(res?.id);
      default:
        break;
    }
  };

  const handleEditButton = (id) => {
    window.location.href = "/dashboard/usereditor?id=" + id;
  }

  const handleDeleteButton = (id) => {

  }

  const handleFollowButton = (id) => {

  }

  const handleUnfollowButton = (id) => {

  }


  return (
    <div className="PostEditor">
      <Container component="main" maxWidth="lg">
        <form>
          <Box
            sx={{
              marginTop: 4,
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

  );
}
UserRoster.propTypes = {};

UserRoster.defaultProps = {};

export default UserRoster;
