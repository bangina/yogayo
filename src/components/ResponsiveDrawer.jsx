import React, { Children } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactComponent as UserIcon } from "../icons/UserIcon.svg";
import { ReactComponent as NotebookIcon } from "../icons/NotebookIcon.svg";
import { ReactComponent as TextBubbleIcon } from "../icons/TextBubbleIcon.svg";
import { ReactComponent as CalendarIcon } from "../icons/CalendarIcon.svg";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { ReactComponent as Yogayo } from "../icons/Yogayo.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "1800px",
    margin: "0 auto",
    "&>*": {
      minWidth: 0,
    },
  },
  profile: {
    textAlign: "center",
  },
  avatar: {
    background: "pink",
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  subMenu: {
    "& > *": {
      fontSize: "14px",
      color: "#444",
      paddingLeft: "2.5rem",
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List className={classes.profile}>
        <Avatar className={classes.avatar}>SB</Avatar>
        <ListItemText primary="솔방울" secondary="요가왕 요가원" />
      </List>
      <Divider />
      <List>
        <RouterLink to="/booking">
          <ListItem>
            <SvgIcon
              style={{ marginRight: "10px" }}
              fontSize="medium"
              viewBox="0 0 32 32"
            >
              <CalendarIcon />
            </SvgIcon>
            <ListItemText primary="수업 예약" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/board">
          <ListItem>
            <SvgIcon
              style={{ marginRight: "10px" }}
              fontSize="medium"
              viewBox="0 0 32 32"
            >
              <TextBubbleIcon />
            </SvgIcon>
            <ListItemText primary="커뮤니티" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/diary">
          <ListItem>
            <SvgIcon
              style={{ marginRight: "10px" }}
              fontSize="medium"
              viewBox="0 0 32 32"
            >
              <NotebookIcon />
            </SvgIcon>
            <ListItemText primary="다이어리" />
          </ListItem>
        </RouterLink>
        <ListItem button onClick={handleClick}>
          <SvgIcon
            style={{ marginRight: "10px" }}
            fontSize="medium"
            viewBox="0 0 32 32"
          >
            <UserIcon />
          </SvgIcon>
          <ListItemText primary="마이페이지" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <RouterLink to="/vouchers">
              <ListItem button className={classes.nested}>
                <ListItemText
                  secondary="내 회원권 정보"
                  className={classes.subMenu}
                />
              </ListItem>
            </RouterLink>
            <RouterLink to="/mypage/bookings">
              <ListItem button className={classes.nested}>
                <ListItemText
                  secondary="예약 현황"
                  className={classes.subMenu}
                />
              </ListItem>
            </RouterLink>
            <RouterLink to="/notifications">
              <ListItem button className={classes.nested}>
                <ListItemText secondary="알림" className={classes.subMenu} />
              </ListItem>
            </RouterLink>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ background: theme.palette.primary.mainGradient }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <RouterLink to="/">
            <Logo style={{ marginRight: "10px" }} />
            <Yogayo />
          </RouterLink>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
