import React, {useEffect, useState} from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { openLogoutModal } from "../redux/modal";
import LogoutModal from "./modal/LogoutModal";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactComponent as NotebookIcon } from "../icons/NotebookIcon.svg";
import { ReactComponent as PencilIcon } from "../icons/Pencil.svg";
import { ReactComponent as TextBubbleIcon } from "../icons/TextBubbleIcon.svg";
import { ReactComponent as CalendarIcon } from "../icons/CalendarIcon.svg";
import { ReactComponent as UserIcon } from "../icons/UserIcon.svg";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { ReactComponent as Yogayo } from "../icons/Yogayo.svg";
import { ReactComponent as HomeIcon } from "../icons/HomeIcon.svg";
import { isUserAuthenticated } from "../utils/authUtils";
import axios from "axios";
import { Cookies } from "react-cookie";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "1800px",
    margin: "0 auto",
    paddingTop:"2rem",
    "&>*": {
      minWidth: 0,
    },
  },
  profile: {
    textAlign: "center",
  },
  avatar: {
    background: "rgba(0,0,0,0.08)",
    margin: "auto",
    marginBottom: theme.spacing(2),
    width: "4rem",
    height: "4rem",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  login: {
    color: "#fff",
    alignSelf: "flex-end",
    position: "absolute",
    right: "32px",
    top:"50%",
    transform:"translateY(-50%)",
    fontWeight: "bold",
  },
  appBar: {
    paddingLeft: theme.spacing(0),
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
    maxWidth:"1300px",
    margin: "auto"
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
  const [userInfo, setUserInfo] = useState({});
  const propUserInfo = props.userInfo;
  const [adminname, setAdminname] = useState();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openModal = () => {
    dispatch(openLogoutModal());
  };
  // const handld
  
  const userApiCall = () => {
    const apiUrl = `http://127.0.0.1:8000/api/myinfo/`;
    // 로그인 유저 정보 불러오기
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUserInfo(response.data[0]);
        console.log("유저정보 가져오기", response.data[0]);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const voucherApiCall = () => {
    const apiUrl = `http://127.0.0.1:8000/api/myvouchers/`;
    // 로그인 유저 정보 불러오기
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setAdminname(response.data[0].adminname);
        console.log("바우처 정보", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  useEffect(()=>{
    voucherApiCall();
  },[])

  useEffect(()=>{
    userApiCall();
  },[propUserInfo])

  const imgChange =() => {
    console.log("imgChange!")
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List className={classes.profile}>
        <Avatar className={classes.avatar}>
          {userInfo.img_profile ? (
            <img
            src={userInfo.img_profile}
            alt="user"
            style={{ width: "100%", opacity: "0.8" }}
          />
          ) : null}
          
        </Avatar>
        
        {isUserAuthenticated() ? (
          <>
          <RouterLink to="/mypage">
            <ListItemText primary={`${userInfo.username} 님 >`} secondary={adminname} />
          </RouterLink>
          <Button
            variant="outlined"
            color="primary"
            name="logout"
            onClick={openModal}
          >
            로그아웃
          </Button>
          </>
        ) : (
          <ListItemText primary="로그인 해주세요!" secondary={adminname} />
        )}
      </List>
      <List>
        <RouterLink to="/">
          <ListItem>
            <SvgIcon style={{ margin: "0 10px", transform:"translateY(3px)" }} viewBox="0 0 32 32">
              <HomeIcon />
            </SvgIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/booking">
          <ListItem>
            <SvgIcon style={{ margin: "0 10px", transform:"translateY(3px)" }} viewBox="0 0 32 32">
              <CalendarIcon />
            </SvgIcon>
            <ListItemText primary="수업 예약하기" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/mybookings">
          <ListItem>
            <SvgIcon style={{ margin: "0 10px", transform:"translateY(3px)" }} viewBox="0 0 32 32">
              <NotebookIcon />
            </SvgIcon>
            <ListItemText primary="내 스케쥴" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/board">
          <ListItem>
            <SvgIcon style={{ margin: "0 10px", transform:"translateY(3px)" }}viewBox="0 0 32 32">
              <TextBubbleIcon />
            </SvgIcon>
            <ListItemText primary="요가요 커뮤니티" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/diary">
          <ListItem>
            <SvgIcon style={{ margin: "0 10px", transform:"translateY(3px)" }} viewBox="0 0 32 32">
              <PencilIcon />
            </SvgIcon>
            <ListItemText primary="수련 일기" />
          </ListItem>
        </RouterLink>
        {/* <RouterLink to="/notifications">
          <ListItem>
            <SvgIcon
              style={{ margin: "0 10px" }}
              viewBox="0 0 32 32"
            >
              <NotebookIcon />
            </SvgIcon>
            <ListItemText primary="알림" />
          </ListItem>
        </RouterLink> */}
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
        <Toolbar style={{maxWidth:"1300px", margin:"0 auto", width:"100%"}}>
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
            <Logo style={{ margin: "0 10px" }} />
            <Yogayo />
          </RouterLink>
          {!isUserAuthenticated() ? (
            <RouterLink to="/login" className={classes.login}>
              <span>로그인</span>
            </RouterLink>
          ) : (
            <RouterLink to="/mypage" className={classes.login}>
            <SvgIcon>
               <UserIcon/>
              </SvgIcon>
            </RouterLink>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
      <main className={classes.content} >
        <div className={classes.toolbar} />
        {props.children}
      </main>

      <LogoutModal logout={openLogoutModal} apiCall={userApiCall}></LogoutModal>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
