import React, { useEffect, useState } from 'react';
import './PostEditor.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from '../../util/Mapper';
import ApiManager from '../../util/ApiManager';
import { FETCH_POST_EDITOR_VIEW, GET_POST, SAVE_POST, UPDATE_LIKE, UPDATE_POST } from '../../util/StringConstants';
import { useLocation } from 'react-router-dom';

const API = ApiManager();
const PostEditor = () => {
  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const editPostId = queryParams.get("post");

  useEffect(() => {
    const urls = [API.get(FETCH_POST_EDITOR_VIEW)]
    if (editPostId) {
      urls.push(API.post(GET_POST, {id: editPostId}))
    }

    Promise.all(urls)
      .then((responses) => {
        // console.log(responses);
        setDesign(responses[0]?.data?.design)
        setCompData(responses[1] ? responses[1]?.data?.data : {})
      }, (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
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
    e.preventDefault();
    const { title, description, enablelike } = compData;
    let newData = compData;
    // console.log(compData);
    if (!enablelike) {
      newData = {...compData, enablelike: "yes" };
      setCompData(newData);
    }

    if (title && description) {

      API.post(editPostId ? UPDATE_POST : SAVE_POST, prepareData(newData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response?.statusText === 'OK') {
            window.location.href = "/dashboard/feed"
          }
          
        }, (error) => {
          if (error.response?.status === 401 || error.response?.status === 403) {
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

  const prepareData = (newData) => {
    const { title, description, enablelike } = newData;
    return ({
      _id: editPostId,
      title: title,
      description: description,
      enablelike: enablelike
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
              design && design.map(element =>
                <Mapper
                  element={element}
                  onEvent={(res) => getActionHandler(res)}
                  defaultValue={compData[element?.id] ? compData[element?.id] : element?.data?.default}
                  data={compData}
                />)
            }
          </Box>
        </form>
      </Container>
    </div>
  )
};

PostEditor.propTypes = {};

PostEditor.defaultProps = {};

export default PostEditor;
