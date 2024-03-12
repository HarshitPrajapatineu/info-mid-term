import React, { useState } from 'react';
import './PostCard.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '@mui/material';

const PostCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const [cardData, setCardData] = useState(data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          ? <IconButton onClick={(cardData) => { handleLikeButton() }} aria-label="add to favorites">
            <Icon>{"favorite_icon"}</Icon>
          </IconButton>
          : <></>}
        <IconButton onClick={() => { handleLikeButton() }} aria-label="share">
          <Icon>{"favorite_icon"}</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default PostCard;
