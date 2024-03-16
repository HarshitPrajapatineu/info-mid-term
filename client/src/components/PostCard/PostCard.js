import React, { useState } from 'react';
import './PostCard.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import { Icon } from '@mui/material';
import ApiManager from '../../util/ApiManager';
import { DELETE_POST, UPDATE_LIKE } from '../../util/StringConstants';


const API = ApiManager();

const PostCard = ({ data, onDelete }) => {

  const [cardData, setCardData] = useState(data);

  const handleLikeButton = () => {
    API.post(UPDATE_LIKE, { id: cardData?._id, action: (!cardData?.isLiked ? "add" : "remove") })
      .then((response) => {
        if (response?.statusText === "OK") {
          setCardData({
            ...cardData,
            isLiked: !cardData.isLiked,
            likeCount: (cardData.isLiked ? cardData.likeCount - 1 : cardData.likeCount + 1)
          });
        }
      }, (error) => {
        
      })
  }
  const handleEditButton = () => {
    window.location.href = "/dashboard/posteditor?post=" + cardData?._id;
  }

  const handleDeleteButton = () => {
    API.post(DELETE_POST, { id: cardData?._id })
      .then((response) => {
        if (response?.statusText === "OK") {
          onDelete(cardData?._id)
        }
      }, (error) => {
        
      })
  }


  return (
    <Card sx={{ maxWidth: "lg" }}>

      {/* Post Header*/}
      <CardHeader
        avatar={
          <Avatar src="/broken-image.jpg" />
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={cardData?.title}
        subheader={cardData?.createdOn}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}

      {/* Post Description */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {cardData?.description}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions disableSpacing >
        {cardData?.enablelike === "yes"
          ? <>
            <IconButton
              sx={{ fontSize: '0.95rem' }} onClick={() => { handleLikeButton() }} aria-label="add to favorites">
              {cardData?.isLiked
                ? <Icon sx={{ color: pink[500], mr: 1 }} >{"favorite_icon"}</Icon>
                : <Icon sx={{ mr: 1 }}>{"favorite_icon"}</Icon>}
              {cardData?.likeCount}
            </IconButton>
          </>
          : <></>}

        {localStorage.getItem("userrole") === "admin" || cardData?.createdBy === localStorage.getItem("userId")
          ? <>
            <IconButton onClick={() => { handleEditButton() }} aria-label="share">
              <Icon>{"edit_icon"}</Icon>
            </IconButton>

            <IconButton onClick={() => { handleDeleteButton() }} aria-label="share">
              <Icon>{"delete_icon"}</Icon>
            </IconButton>
          </>
          : <></>
        }
      </CardActions>
    </Card>
  );
}
export default PostCard;
