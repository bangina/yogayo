import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/member"; //액션객체 생성함수
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Cookies } from "react-cookie";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Yogayo
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 2.5,
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [memberState, setMemberState] = useState({
    username: "",
    password: "",
  });
  const onInputChange = (e) => {
    setMemberState({ ...memberState, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const onLogin = (e) => {
    e.preventDefault();
    // dispatch(login(memberState.username, memberState.password));
    // props.history.push("/");

    const apiUrl = "http://localhost:8000/api/get_token/";

    axios
      .post(apiUrl, memberState)
      .then((response) => {
        console.log("호출 결과 :", response.data);
        const token = response.data.token;

        // 쿠키고 서버에서 제공한 토큰정보를 usertoken 쿠키로 브라우저에 저장.
        let cookies = new Cookies();
        cookies.set("usertoken", token, { path: "/" }); // "/"밑에있는 모든 경로에서 접근 가능한 쿠키

        // window.location = "/";
      })
      .catch((response) => {
        console.error(response);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} noValidate action="#">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="이메일 주소"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호 "
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="로그인 유지하기"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onLogin}
          >
            로그인 하기
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호를 잊어버렸어요.
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                아직 회원이 아니신가요? <strong>회원가입하기</strong>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
