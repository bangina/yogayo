import React from "react";
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
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
  const content = props.content;
  const ellipsis = props.ellipsis;

  return (
    <RouterLink to={`/board/detail/${content.id}`}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar>SB</Avatar>}
          title={content.writer}
          subheader={content.regiDate}
        />
        <CardMedia
          className={classes.media}
          image="./img/yoga.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" component="p" className={classes.boardTitle}>
            {content.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.boardText}
          >
            {content.contents}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </RouterLink>
  );
};

export default BoardCard;
