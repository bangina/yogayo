import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Notifications = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="커뮤니티" {...a11yProps(0)} />
          <Tab label="다이어리" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <b>요가좋아</b>
                  {"님이 댓글을 남겼습니다 : 너무 멋져요!"}
                </React.Fragment>
              }
              secondary="Jan 9, 2014"
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
          <Divider />
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <b>요가좋아</b>
                  {"님이 회원님의 글을 좋아합니다"}
                </React.Fragment>
              }
              secondary="Jan 9, 2014"
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <Avatar>SB</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
          <Divider />
        </List>
      </TabPanel>
    </div>
  );
};

export default Notifications;
