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
}));

const BoardCard = (props) => {
  const classes = useStyles();
  const content = props.content;

  return (
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
        <Typography variant="h5" component="p">
          {content.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {content.contents.length > 50
            ? content.contents.substr(0, 50) + "..."
            : content.contents}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <RouterLink to={`/board/detail/${content.id}`}>
          <Button className={classes.btn} color="primary">
            글보기
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
};

export default BoardCard;
