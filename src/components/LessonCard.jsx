import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOn from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
});

export default function LessonCard(props) {
  const classes = useStyles();
  const {name, admin_name, date} = props.content

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        <LocationOn className={classes.locationIcon} />
          <span>{admin_name}</span>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" onClick={props.onClick}>일기 작성</Button>
      </CardActions>
    </Card>
  );
}