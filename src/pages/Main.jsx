import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DiaryCard from "../components/DiaryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import BoardCard from "../components/BoardCard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { getUserToken } from "../utils/authUtils";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  swiper: {
    marginBottom: "2rem",
    padding: "1rem 0",
  },
  heroContent: {
    padding: theme.spacing(2, 0, 6),
    "&>*": {
      backgroundColor: "rgb(207, 85, 108)",
      color: "#fff",
      padding: "2rem 3rem",
      borderRadius: "10px",
      boxShadow: "1px 2px 4px rgba(0,0,0,0.2)",
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  linkBox: {
    textAlign: "right",
    fontSize: "1.1rem",
    letterSpacing: "0.04rem",
    cursor: "pointer",
    lineHeight: "0rem",
    display: "flex",
    justifyContent: "space-between",
  },
  bookingText: {
    fontSize: "1.2rem",
  },
  bookingArrow: {
    verticalAlign: "text-bottom",
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
  tagIcon: {
    display: "inline-block",
    marginRight: "10px",
    color: "#fff",
    lineHeight: "2rem",
    padding: "0 1rem",
    borderRadius: "30px",
    background: "#cf556c",
    fontSize: "1rem",
    boxShadow: "2px 2px 4px rgba(0,0,0,0.15)",
  },
}));

const Main = (props) => {
  const [userInfo, setUserInfo] = useState("");
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
  const contents = [
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
  ];

  const boardContents = [];

  const classes = useStyles();
  const loginUserToken = getUserToken();

  const list = window.matchMedia("(min-width:960px)");
  const initialSlideNum = function () {
    if (list.matches === true) {
      return 3;
    } else {
      return 1.7;
    }
  };
  const [slidesPerView, setSlidesPerView] = useState(initialSlideNum);
  useEffect(() => {

  const apiUrl = `http://127.0.0.1:8000/api/myinfo/`;
  const apiCall = () => {
    // 로그인 유저 정보 불러오기
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUserInfo(response.data[0]);
        // console.log("로그인 유저", response.data[0]);
      })
      .catch((response) => {
        console.error(response);
      });
  };
  apiCall();
//화면 가로크기 조정시 카드 width 조정
    function handleResize() {
      if (list.matches === true) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1.7);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Typography
          component="h2"
          variant="h6"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {loginUserToken
            ? `${userInfo.username}님! 안녕하세요 🧘‍♀️`
            : "안녕하세요 요가요입니다. 🧘‍♀️"}
        </Typography>
        <div className={classes.heroContent}>
          <Container maxWidth="sm" className={classes.linkBox}>
            <EventAvailableIcon
              fontSize="large"
              className={classes.bookingIcon}
            />
            <Typography
              align="center"
              onClick={() =>
                loginUserToken
                  ? props.history.push("/booking")
                  : props.history.push("/login")
              }
              className={classes.bookingText}
            >
              <strong>수업 예약</strong> 하러가기
              <ArrowForwardIcon
                fontSize="large"
                className={classes.bookingArrow}
              />
            </Typography>
          </Container>
        </div>
        <Typography variant="h6" gutterBottom fontWeight="fontWeightBold">
          오늘 올라온 수련일기
        </Typography>
        <br />
        <br />
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          // navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {contents.map((content) => (
            <SwiperSlide className={classes.swiperSlide}>
              <DiaryCard content={content} ellipsis={true} />
            </SwiperSlide>
          ))}
        </Swiper>
        <br />
        <Typography variant="h5" color="" gutterBottom>
          요가요 피플 커뮤니티
        </Typography>
        <br />
        <div>
          <span className={classes.tagIcon}> 요가</span>
          <span className={classes.tagIcon}>필테</span>
          <span className={classes.tagIcon}>중고장터</span>
          <span className={classes.tagIcon}>같이 운동해요</span>
        </div>
        <br />
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          // navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className={classes.swiper}
        >
          {boardContents.map((content) => (
            <SwiperSlide>
              <BoardCard content={content} ellipsis={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </React.Fragment>
  );
};

export default Main;
