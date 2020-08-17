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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
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
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
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
      <List>
        <ListItemAvatar>
          <Avatar className={classes.orange}>SB</Avatar>
        </ListItemAvatar>
        <ListItemText primary="솔방울" secondary="요가왕 요가원" />
      </List>
      <Divider />
      <List>
        <RouterLink to="/booking">
          <ListItem>
            <ListItemText primary="수업 예약하기" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/community">
          <ListItem>
            <ListItemText primary="요기 모여라" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/diary">
          <ListItem>
            <ListItemText primary="수련 다이어리" />
          </ListItem>
        </RouterLink>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="마이페이지" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <RouterLink to="/vouchers">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="수강권 정보" />
              </ListItem>
            </RouterLink>
            <RouterLink to="/bookings">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="예약 현황" />
              </ListItem>
            </RouterLink>
            <RouterLink to="/diaries">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="글 관리" />
              </ListItem>
            </RouterLink>
            <RouterLink to="/notifications">
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="댓글 알림" />
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
          <Typography variant="h6" noWrap>
            <RouterLink to="/" style={{ color: "#fff" }}>
              <svg
                width="60"
                height="36"
                viewBox="0 0 606 362"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1">
                  <path
                    id="Vector 1"
                    d="M577.997 179.584C514.398 151.968 370.508 137.128 303.748 298.698C366.522 327.762 509.257 344.63 577.997 179.584Z"
                    fill="#D43D59"
                    fillOpacity="0.95"
                  />
                  <path
                    id="Vector 2"
                    d="M475.498 53.5109C406.845 63.2229 276.431 125.805 303.999 298.437C372.707 290.391 503.197 230.141 475.498 53.5109Z"
                    fill="#D43D59"
                    fillOpacity="0.8"
                  />
                  <path
                    id="Vector 3"
                    d="M304.142 0C253.475 47.3333 182.542 173.4 304.142 299C355.808 253 428.142 128.8 304.142 0Z"
                    fill="#D43D59"
                    fillOpacity="0.5"
                  />
                  <path
                    id="Vector 4"
                    d="M132.999 54.271C118.645 122.105 132.848 266.059 304.499 299.197C320.437 231.882 308.451 88.6542 132.999 54.271Z"
                    fill="#D43D59"
                    fillOpacity="0.3"
                  />
                  <path
                    id="Vector 5"
                    d="M22.9638 196.338C50.1136 260.138 144.317 369.911 303.932 298.602C278.377 234.318 186.407 123.868 22.9638 196.338Z"
                    fill="#D43D59"
                    fillOpacity="0.15"
                  />
                </g>
              </svg>
              <svg
                width="86"
                height="24"
                viewBox="0 0 43 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "10px" }}
              >
                <path
                  id="Yogayo"
                  d="M4.248 6.096V9H3.372V6.096L0.012 0.599999H0.96L3.84 5.316L6.72 0.599999H7.608L4.248 6.096ZM10.6703 9.06C10.0623 9.06 9.51434 8.924 9.02634 8.652C8.53834 8.372 8.15434 7.988 7.87434 7.5C7.59434 7.012 7.45434 6.46 7.45434 5.844C7.45434 5.228 7.59434 4.676 7.87434 4.188C8.15434 3.7 8.53834 3.32 9.02634 3.048C9.51434 2.776 10.0623 2.64 10.6703 2.64C11.2783 2.64 11.8263 2.776 12.3143 3.048C12.8023 3.32 13.1823 3.7 13.4543 4.188C13.7343 4.676 13.8743 5.228 13.8743 5.844C13.8743 6.46 13.7343 7.012 13.4543 7.5C13.1823 7.988 12.8023 8.372 12.3143 8.652C11.8263 8.924 11.2783 9.06 10.6703 9.06ZM10.6703 8.304C11.1183 8.304 11.5183 8.204 11.8703 8.004C12.2303 7.796 12.5103 7.504 12.7103 7.128C12.9103 6.752 13.0103 6.324 13.0103 5.844C13.0103 5.364 12.9103 4.936 12.7103 4.56C12.5103 4.184 12.2303 3.896 11.8703 3.696C11.5183 3.488 11.1183 3.384 10.6703 3.384C10.2223 3.384 9.81834 3.488 9.45834 3.696C9.10634 3.896 8.82634 4.184 8.61834 4.56C8.41834 4.936 8.31834 5.364 8.31834 5.844C8.31834 6.324 8.41834 6.752 8.61834 7.128C8.82634 7.504 9.10634 7.796 9.45834 8.004C9.81834 8.204 10.2223 8.304 10.6703 8.304ZM21.4578 2.688V8.232C21.4578 9.304 21.1938 10.096 20.6658 10.608C20.1458 11.128 19.3578 11.388 18.3018 11.388C17.7178 11.388 17.1618 11.3 16.6338 11.124C16.1138 10.956 15.6898 10.72 15.3618 10.416L15.7938 9.768C16.0978 10.04 16.4658 10.252 16.8978 10.404C17.3378 10.556 17.7978 10.632 18.2778 10.632C19.0778 10.632 19.6658 10.444 20.0418 10.068C20.4178 9.7 20.6058 9.124 20.6058 8.34V7.536C20.3418 7.936 19.9938 8.24 19.5618 8.448C19.1378 8.656 18.6658 8.76 18.1458 8.76C17.5538 8.76 17.0138 8.632 16.5258 8.376C16.0458 8.112 15.6658 7.748 15.3858 7.284C15.1138 6.812 14.9778 6.28 14.9778 5.688C14.9778 5.096 15.1138 4.568 15.3858 4.104C15.6658 3.64 16.0458 3.28 16.5258 3.024C17.0058 2.768 17.5458 2.64 18.1458 2.64C18.6818 2.64 19.1658 2.748 19.5978 2.964C20.0298 3.18 20.3778 3.492 20.6418 3.9V2.688H21.4578ZM18.2298 8.004C18.6858 8.004 19.0978 7.908 19.4658 7.716C19.8338 7.516 20.1178 7.24 20.3178 6.888C20.5258 6.536 20.6298 6.136 20.6298 5.688C20.6298 5.24 20.5258 4.844 20.3178 4.5C20.1178 4.148 19.8338 3.876 19.4658 3.684C19.1058 3.484 18.6938 3.384 18.2298 3.384C17.7738 3.384 17.3618 3.48 16.9938 3.672C16.6338 3.864 16.3498 4.136 16.1418 4.488C15.9418 4.84 15.8418 5.24 15.8418 5.688C15.8418 6.136 15.9418 6.536 16.1418 6.888C16.3498 7.24 16.6338 7.516 16.9938 7.716C17.3618 7.908 17.7738 8.004 18.2298 8.004ZM26.0483 2.64C26.8723 2.64 27.5043 2.848 27.9443 3.264C28.3843 3.672 28.6043 4.28 28.6043 5.088V9H27.7883V8.016C27.5963 8.344 27.3123 8.6 26.9363 8.784C26.5683 8.968 26.1283 9.06 25.6163 9.06C24.9123 9.06 24.3523 8.892 23.9363 8.556C23.5203 8.22 23.3123 7.776 23.3123 7.224C23.3123 6.688 23.5043 6.256 23.8883 5.928C24.2803 5.6 24.9003 5.436 25.7483 5.436H27.7523V5.052C27.7523 4.508 27.6003 4.096 27.2963 3.816C26.9923 3.528 26.5483 3.384 25.9643 3.384C25.5643 3.384 25.1803 3.452 24.8123 3.588C24.4443 3.716 24.1283 3.896 23.8643 4.128L23.4803 3.492C23.8003 3.22 24.1843 3.012 24.6323 2.868C25.0803 2.716 25.5523 2.64 26.0483 2.64ZM25.7483 8.388C26.2283 8.388 26.6403 8.28 26.9843 8.064C27.3283 7.84 27.5843 7.52 27.7523 7.104V6.072H25.7723C24.6923 6.072 24.1523 6.448 24.1523 7.2C24.1523 7.568 24.2923 7.86 24.5723 8.076C24.8523 8.284 25.2443 8.388 25.7483 8.388ZM36.1053 2.688L32.9493 9.756C32.6933 10.348 32.3973 10.768 32.0613 11.016C31.7253 11.264 31.3213 11.388 30.8493 11.388C30.5453 11.388 30.2613 11.34 29.9973 11.244C29.7333 11.148 29.5053 11.004 29.3133 10.812L29.7093 10.176C30.0293 10.496 30.4133 10.656 30.8613 10.656C31.1493 10.656 31.3933 10.576 31.5933 10.416C31.8013 10.256 31.9933 9.984 32.1693 9.6L32.4453 8.988L29.6253 2.688H30.5133L32.8893 8.052L35.2653 2.688H36.1053ZM39.7094 9.06C39.1014 9.06 38.5534 8.924 38.0654 8.652C37.5774 8.372 37.1934 7.988 36.9134 7.5C36.6334 7.012 36.4934 6.46 36.4934 5.844C36.4934 5.228 36.6334 4.676 36.9134 4.188C37.1934 3.7 37.5774 3.32 38.0654 3.048C38.5534 2.776 39.1014 2.64 39.7094 2.64C40.3174 2.64 40.8654 2.776 41.3534 3.048C41.8414 3.32 42.2214 3.7 42.4934 4.188C42.7734 4.676 42.9134 5.228 42.9134 5.844C42.9134 6.46 42.7734 7.012 42.4934 7.5C42.2214 7.988 41.8414 8.372 41.3534 8.652C40.8654 8.924 40.3174 9.06 39.7094 9.06ZM39.7094 8.304C40.1574 8.304 40.5574 8.204 40.9094 8.004C41.2694 7.796 41.5494 7.504 41.7494 7.128C41.9494 6.752 42.0494 6.324 42.0494 5.844C42.0494 5.364 41.9494 4.936 41.7494 4.56C41.5494 4.184 41.2694 3.896 40.9094 3.696C40.5574 3.488 40.1574 3.384 39.7094 3.384C39.2614 3.384 38.8574 3.488 38.4974 3.696C38.1454 3.896 37.8654 4.184 37.6574 4.56C37.4574 4.936 37.3574 5.364 37.3574 5.844C37.3574 6.324 37.4574 6.752 37.6574 7.128C37.8654 7.504 38.1454 7.796 38.4974 8.004C38.8574 8.204 39.2614 8.304 39.7094 8.304Z"
                  fill="white"
                />
              </svg>
            </RouterLink>
          </Typography>
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
