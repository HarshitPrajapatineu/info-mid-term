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

const roles = ['admin', 'consumer'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];



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
      console.log(error);
    })

  }, [])

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
              design && design.map(element => <Mapper element={element} onEvent={(res) => {}} data={compData} />)
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
