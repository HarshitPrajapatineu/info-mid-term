import React, { useEffect, useState } from 'react';
import './PostEditor.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from '../../util/Mapper';
import ApiManager from '../../util/ApiManager';
import { FETCH_POST_EDITOR_VIEW, SAVE_POST } from '../../util/StringConstants';

const API = ApiManager();
const PostEditor = () => {
  let [design, setDesign] = useState([]);
  let [compData, setCompData] = useState({});

  useEffect(() => {
    API.get(FETCH_POST_EDITOR_VIEW)
      .then((response) => {
        console.log(response);
        setDesign(response?.data?.design)
      }, (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login"
        }
        console.log(error);
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
    if (!enablelike) {
      setCompData({ ...compData, enablelike: "yes" })
    }

    if (title && description) {

      API.post(SAVE_POST, prepareData(compData))
        .then((response) => {
          setDesign(showError(false, null));
          if (response?.statusText === 'OK') {
            window.location.href = "/dashboard/feed"
          }
          console.log(response);
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

  const prepareData = () => {
    const { title, description, enablelike } = compData;
    return ({
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
                  defaultValue={element?.data?.default}
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
