import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { insertMember } from "../../src/redux/member"; //액션객체 생성함수
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const alertRef = useRef();
  const [memberState, setMemberState] = useState({
    name: "",
    isNameValid: false,
    email: "",
    isEmailValid: false,
    password: "",
    isPwdValid: false,
    passwordCheck: "",
    isPwdCkValid: false,
    mobile: "",
    ismobileValid: false,
  });

  const dispatch = useDispatch();

  // const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  // const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
  // const mobileRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const validateName = (nameEntered) => {
    if (nameEntered.length > 4) {
      setMemberState({ ...memberState, name: nameEntered, isNameValid: true });
    } else {
      setMemberState({ ...memberState, name: nameEntered, isNameValid: false });
    }
  };

  const isEnteredNameValid = () => {
    if (memberState.name) {
      return memberState.isNameValid;
    } else {
      return true;
    }
  };

  const inputClassNameHelper = (boolean) => {
    switch (boolean) {
      case true:
        return "";
      case false:
        return "5글자 이상 입력하세요";
      default:
        return "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //redux에 회원 정보 추가
    dispatch(insertMember(memberState));
  };
  const onInputChange = (e) => {
    setMemberState({ ...memberState, [e.target.name]: e.target.value });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                autoComplete="name"
                onChange={(e) => validateName(e.target.value)}
                helperText={inputClassNameHelper(isEnteredNameValid())}
                error={!isEnteredNameValid()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                onChange={onInputChange}
                // error={valid.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="휴대폰 번호"
                name="mobile"
                autoComplete="mobile"
                onChange={onInputChange}
                // error={valid.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                onChange={onInputChange}
                // error={valid.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="passwordCheck"
                onChange={onInputChange}
                // error={valid.passwordCheck}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="동의 어쩌구"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            가입 하기
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                이미 회원이신가요? 로그인하기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
