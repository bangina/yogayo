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

const BoardCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar>SB</Avatar>}
        title="Shrimp and Chorizo Paella"
        subheader="2020.09.10"
      />
      <CardMedia
        className={classes.media}
        image="./img/yoga.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" component="p">
          Title
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button className={classes.btn} color="primary">
          글보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default BoardCard;
