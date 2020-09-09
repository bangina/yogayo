import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

const TabBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tabName, setTabName] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  useEffect(() => {
    console.log(props.menu);
    if (props.menu === "notification") {
      setTabName(["커뮤니티", "다이어리"]);
    } else if (props.menu === "bookings") {
      setTabName(["예약한 수업", "지난 수업"]);
    }
  }, [props.menu]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label={tabName[0]} {...a11yProps(0)} />
          <Tab label={tabName[1]} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {props.children}
    </div>
  );
};

export default TabBar;
