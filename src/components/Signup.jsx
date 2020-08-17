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
import { useForm } from "react-hook-form";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getDate().getFullYear()}
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
    margin: theme.spacing(3, 0, 3),
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 2.5,
  },
}));

export default function Signup() {
  const inputRef = useRef();
  const mobileRef = useRef();
  const classes = useStyles();
  const [memberState, setMemberState] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    mobile: "",
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, errors, trigger, isValid } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = () => {
    dispatch(insertMember(memberState));
  };
  const onInputChange = (e) => {
    setMemberState({ ...memberState, [e.target.name]: e.target.value });
  };
  const checkFormValidity = (e) => {
    console.log(isValid);
    if (isValid) {
      return false;
    } else {
      return true;
    }
  };
  const autoHypenPhone = function (e) {
    let str = e.target.value;
    str = str.replace(/[^0-9]/g, "");
    let tmp = "";
    if (str.length < 4) {
      setMemberState({ ...memberState, [memberState.mobile]: str });
      console.log(memberState.mobile);
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3);
      setMemberState({ ...memberState, [memberState.mobile]: tmp });
      console.log(memberState.mobile);
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3, 3);
      tmp += "-";
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3, 4);
      tmp += "-";
      tmp += str.substr(7);
      return tmp;
    }
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
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                name="name"
                // autoComplete="name"
                autoFocus
                inputRef={register({
                  minLength: 2,
                  required: "error message",
                })}
                onChange={(e) => onInputChange(e)}
              />
              {errors.name && (
                <span className="error">이름을 입력해주세요.</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                // autoComplete="email"
                inputRef={register({
                  pattern: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                })}
                onFocus={() => {
                  trigger("name");
                }}
                ref={inputRef}
              />
              {errors.email && (
                <span className="error">이메일 형식에 맞게 작성해주세요.</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="휴대폰 번호"
                name="mobile"
                // autoComplete="mobile"
                ref={mobileRef}
                onKeyUp={(e) => autoHypenPhone(e)}
                inputRef={register({
                  pattern: /^\d{3}-\d{3,4}-\d{4}$/,
                })}
                onChange={(e) => onInputChange(e)}
                onFocus={() => {
                  trigger("email");
                }}
              />
              {errors.mobile && (
                <span className="error">
                  핸드폰 번호를 정확히 입력해주세요.
                </span>
              )}
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
                inputRef={register({
                  pattern: /^[A-Za-z0-9]{6,12}$/,
                })}
                onChange={(e) => onInputChange(e)}
                onFocus={() => {
                  trigger("mobile");
                }}
              />
              {errors.password && (
                <span className="error">
                  비밀번호는 영문과 숫자의 조합으로 6자-12자리로 입력해주세요.
                </span>
              )}
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
                inputRef={register({
                  pattern: /^[A-Za-z0-9]{6,12}$/,
                })}
                onChange={(e) => onInputChange(e)}
                onFocus={() => {
                  trigger("password");
                }}
              />
              {memberState.password === memberState.passwordCheck ? (
                ""
              ) : (
                <span className="error">비밀번호가 일치하지 않습니다.</span>
              )}
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
            // disabled={(e) => {
            //   checkFormValidity(e);
            // }}
            disabled={false}
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
