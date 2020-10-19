import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    transition:"0.2s",
    "&:hover":{
      transform:"translate(1px, -5px)"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  defaultBg:{
    height: 0,
    paddingTop: "56.25%",
    background: "rgba(207, 85, 108,0.5);"
  },
  btn: {
    marginLeft: "auto",
  },
  boardTitle: {
    display: "block",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "30px",
    marginBottom: "1rem",
  },
  boardText: {
    display: "block",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "60px",
  },
  boardProfile:{
    background:"rgba(0,0,0,0.02)"
  }
}));

const BoardCard = (props) => {
  const classes = useStyles();
  const {id, title, content,img_path1, username, img_profile, created} = props.content
  const [img, setImg] = useState()
  
  useEffect(()=>{
    // console.log(props.content)
    if(props.content.img_path1){
      setImg(props.content.img_path1)
    } else {
      setImg("./img/yoga.jpg")
    }
  },[])

  const media =() => {
    if(img_path1) {
      return (
        <CardMedia
          className={classes.media}
          image={img_path1}
          title="Paella dish"
        />
      )
    }else{return <CardMedia
      className={classes.defaultBg}
      title="카드 배경"
    />}
  }

  const avatarImg = () => {
  //   if(img_profile){
  //     return (
  //       <Avatar><img src={img_profile} style={{ width: '100%' }} /></Avatar>
  //     )
  //   } else {
  //     return <Avatar />
  //   }
    return <Avatar></Avatar>
  }


  
  return (
    <RouterLink to={`/board/detail/${id}`}>
      <Card className={classes.root}>
        
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Paella dish"
        /> */}
        {media()}
        <CardContent>
          <Typography variant="h6" component="p" className={classes.boardTitle}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.boardText}
          >
            {content}
          </Typography>
        </CardContent>
        <CardHeader
          className={classes.boardProfile}
          avatar={<Avatar>{img_profile && <img src={img_profile} style={{ width: '100%'}}/>}</Avatar>}
          title={username}
          subheader={created.substring(0, 10)+ " " + username}
        />
      </Card>
    </RouterLink>
  );
};

export default BoardCard;