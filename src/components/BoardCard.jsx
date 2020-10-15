import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // height: "347px"
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
}));

const BoardCard = (props) => {
  const classes = useStyles();
  // const content = props.content;
  const ellipsis = props.ellipsis;
  const {id, title, content,img_path, username, created} = props.content
  const [img, setImg] = useState()
  
  useEffect(()=>{
    // console.log(props.content)
    if(props.content.img_path){
      setImg(props.content.img_path)
    } else {
      setImg("./img/yoga.jpg")
    }
  },[])

  const media =() => {
    if(img_path) {
      return (
        <CardMedia
          className={classes.media}
          image={img_path}
          title="Paella dish"
        />
      )
    }else{return <CardMedia
      className={classes.defaultBg}
      title="카드 배경"
    />}
  }

  
  return (
    <RouterLink to={`/board/detail/${id}`}>
      <Card className={classes.root}>
        <CardHeader
          // avatar={<Avatar>SB</Avatar>}
          title={title}
          subheader={created.substring(0, 10)+ " " + username}
        />
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Paella dish"
        /> */}
        {media()}
        <CardContent>
          {/* <Typography variant="h6" component="p" className={classes.boardTitle}>
            {title}
          </Typography> */}
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.boardText}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </RouterLink>
  );
};

export default BoardCard;
