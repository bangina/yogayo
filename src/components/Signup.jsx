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
    email: "",
    password: "",
    passwordCheck: "",
    mobile: "",
  });
  const [valid, setValid] = useState({
    name: false,
    email: false,
    password: false,
    passwordCheck: false,
    mobile: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    //유효성 검사
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
    const mobileRegex = /^\d{3}-\d{3,4}-\d{4}$/;

    //1. 필수입력 여부 검사하여 error 색상 표시
    //name
    if (memberState.name === "") {
      setValid({ name: true });
    } else if (memberState.name !== "") {
      setValid({ name: false });
    }

    //name, email
    if (memberState.name !== "" && memberState.email === "") {
      setValid({ email: true });
    } else if (memberState.email !== "") {
      setValid({ email: false });
    }
    //name, email, phone
    if (
      memberState.name !== "" &&
      emailRegex.test(memberState.email) &&
      memberState.mobile === ""
    ) {
      setValid({ mobile: true });
    }

    //2. 정규식 검사하여 에러 내용 알림
    //email
    // else if (!emailRegex.test(memberState.email)) {
    //   alert("이메일 형식에 맞게 입력");
    // } else if (!passwordRegex.test(memberState.password)) {
    //   alert("숫자와 문자 포함 형태의 6~12자리 이내");
    // } else if (!mobileRegex.test(memberState.mobile)) {
    //   alert("핸드폰 번호 형식에 맞게 입력");
    // } else if (memberState.password !== memberState.passwordCheck) {
    //   alert("비밀번호가 다릅니다.");
    // } else {
    //   alert("유효성검사 완료!");
    // }
  }, [memberState]);
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
                onChange={onInputChange}
                // helperText="이름을 입력해주세요"
                error={valid.name}
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
                error={valid.email}
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
                error={valid.mobile}
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
                error={valid.password}
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
                error={valid.passwordCheck}
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
