import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Cookies } from "react-cookie";
import DiaryCard from "../components/DiaryCard";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Detail from "./Detail";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  arrowLeft: {
    position: "absolute",
    left: "-5px",
  },
  arrowRight: {
    position: "absolute",
    right: "-5px",
  },
}));

const Main = (props) => {
  const loginMember = {
    name: "test1",
    email: "test1@gmail.com",
    password: "test1",
    mobile: "010-1111-1111",
    Voucher: {
      id: 1,
      center: "솔방울 요가원",
      VoucherName: "[특가] 6:1 3개월 24회 수강권",
      date: "2020.8.19 ~ 2020.10.19",
      attendance: "24회 중 1회 출석",
    },
  };
  const [contents, setContents] = useState([
    {
      id: 1,
      sessionDate: new Date(),
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      imgSrc: "1",
      diaryText:
        "비가 많이 내려서 그런 걸까요? 오늘따라 기상과 동시에 어찌나 뼈마디가 쑤시던지..😔 오랜만에 요가 매트 펼치고 #모닝요가 시원하게 했어요. 🧘‍♀️ 확실히 오랜만에 하니까 온 몸이 뻐근하고 아이고 아이고 소리가 절로 나와서 얼마나 민망하던지요 😅",
      feeling: "good",
    },
    {
      id: 2,
      sessionDate: new Date(),
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      imgSrc: "2",
      diaryText:
        "발도 떼지 못했던 작년... 수련은 거짓말을 하지않는다 심란한 이시국에 한발이든 두발이든 중심잡고 흔들리지 않게 서보자는 의미에서 이번달 주제는 #하체단련하기",
      feeling: "good",
    },
    {
      id: 3,
      sessionDate: new Date(),
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      imgSrc: "3",
      diaryText:
        "보이차하고 요가하고 🍵🙏🏻 꾸준함에 끈기, 행하고 보고 바로잡고 다시 시도하는 것. 두려움을 넘어야 그 희열이 찾아온다 - 요가로 하여금 늘 많은 것을 배운다. 요가를 더 오래 하고자 시작하여 호흡 몇번에 땀이 나고 온몸이 떨려오는 오늘도 완전호흡하는 수련자라 너무 좋은 요즘",
      feeling: "good",
    },
    {
      id: 4,
      sessionDate: new Date(),
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      imgSrc: "4",
      diaryText:
        "보이차하고 요가하고 🍵🙏🏻 꾸준함에 끈기, 행하고 보고 바로잡고 다시 시도하는 것. 두려움을 넘어야 그 희열이 찾아온다 - 요가로 하여금 늘 많은 것을 배운다. 요가를 더 오래 하고자 시작하여 호흡 몇번에 땀이 나고 온몸이 떨려오는 오늘도 완전호흡하는 수련자라 너무 좋은 요즘",
      feeling: "good",
    },
  ]);
  const classes = useStyles();

  const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get("member");
    return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
  };

  const loginUser = getLoggedInUser();

  useEffect(() => {
    if (!loginUser) {
      props.history.push("/login");
    }
  });

  const onLogout = () => {
    const cookies = new Cookies();
    cookies.remove("member");
    props.history.push("/login");
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {loginUser ? loginUser.name : ""}님{/* {loginMember.name}님 */}
            </Typography>
            <Typography
              // variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {loginMember.Voucher.center} <br />
              {loginMember.Voucher.VoucherName} <br />
              {loginMember.Voucher.date} <br />
              {loginMember.Voucher.attendance} <br />
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.history.push("/booking")}
                  >
                    수업 예약
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    name="logout"
                    onClick={onLogout}
                  >
                    로그아웃
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/* <Container className={classes.cardGrid} maxWidth="md"> */}
        {/* End hero unit */}
        {/* <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="./img/yoga.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    요가 기록
                  </Typography>
                  <Typography>
                    요가 기록 설명글 어쩌구 저쩌구 랄라블라
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => props.history.push("/diary")}
                  >
                    바로가기
                  </Button>
                </CardActions>
              </Card>
            </Grid> */}
        {/* <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="./img/people.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    커뮤니티
                  </Typography>
                  <Typography>
                    커뮤니티 설명글 와라랄ㄹ라라라라ㅏ라랄
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => props.history.push("/board")}
                  >
                    바로가기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid> */}
        {/* </Container> */}
        <Typography>오늘의 요기 피드</Typography>
        <Swiper
          spaceBetween={40}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {contents.map((content) => (
            <SwiperSlide>
              <DiaryCard content={content} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography>커뮤니티</Typography>
        <img
          src="./img/temp_post_detail.png"
          alt="temp"
          style={{ width: "100%" }}
        />
      </main>
    </React.Fragment>
  );
};

export default Main;
