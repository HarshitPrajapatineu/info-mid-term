import React, { useEffect, useState } from 'react';
import './UserRoster.scss';
import Box from '@mui/material/Box';
import { DELETE_USER, FETCH_SEARCH_VIEW, FETCH_USER_ROSTER_DATA, FETCH_USER_ROSTER_VIEW, FOLLOW_USER, UNFOLLOW_USER } from '../../util/StringConstants';
import ApiManager from '../../util/ApiManager';
import { Mapper } from '../../util/Mapper';
import { Container } from '@mui/material';

const API = ApiManager();

const UserRoster = ({ view }) => {

  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState([]);
  let [searchString, setSearchString] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const getViewURL = () => {
    switch (view) {
      case "userroster":
        return FETCH_USER_ROSTER_VIEW;
      case "search":
        return FETCH_SEARCH_VIEW;
    }
  }

  useEffect(() => {
    const url = getViewURL();
    Promise.all([
      API.get(url),
      API.post(FETCH_USER_ROSTER_DATA, {})
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



  const getActionHandler = (res) => {
    switch (res?.action) {
      case "oninputchange":
        return setSearchString(res?.value);
      case "submit":
        return handleSearchButton();
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

  const handleSearchButton = () => {
    API.post(FETCH_USER_ROSTER_DATA, createFilterPayload())
      .then((response) => {
        setCompData(response?.data?.data)
      }, (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login"
        }
        
      })
  }

  const createFilterPayload = () => {
    return { searchString: searchString, pagination: paginationModel }
  }

  const handleEditButton = (id) => {
    window.location.href = "/dashboard/usereditor?id=" + id;
  }

  const handleDeleteButton = (id) => {
    Promise.all([
      API.post(DELETE_USER, { id }),
      API.post(FETCH_USER_ROSTER_DATA, {})
    ]).then((responses) => {
      setCompData(responses[1]?.data?.data)
    }, (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/login"
      }
      
    })
  }

  const handleFollowButton = (id) => {
    API.post(FOLLOW_USER, { id: id })
      .then((response) => {
        if (response?.statusText === "OK") {
            let row = compData.find(item => item._id === id);
            row["isFollowed"] = true;
            setCompData([...compData])
        }
      }, (error) => {
        
      })
  }

  const handleUnfollowButton = (id) => {
    API.post(UNFOLLOW_USER, { id: id })
      .then((response) => {
        if (response?.statusText === "OK") {
            let row = compData.find(item => item._id === id);
            row["isFollowed"] = false;
            setCompData([...compData])
        }
      }, (error) => {
        
      })
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
              design && design.map(element => <Mapper
                element={element}
                onEvent={(res) => getActionHandler(res)}
                data={element.id === "searchfield" ? searchString : compData}
                options={{ paginationModel: paginationModel, setPaginationModel: setPaginationModel }} />)

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
