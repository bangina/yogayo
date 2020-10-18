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
  const diaryCall = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const diaryApiUrl = "http://localhost:8000/api/diaries/?page=1";

    axios
      .get(diaryApiUrl)
      .then((response) => {
        console.log("다이어리 데이터:", response.data);
        setDiaryContents(response.data.results);
      })
      .catch((response) => {
        console.error(response);
      });
    }

  const boardCall = () => {
    const boardApiUrl = "http://localhost:8000/api/posts/";

    axios
      .get(boardApiUrl)
      .then((response) => {
        console.log("조회목록데이터:", response.data);
        setBoardContents(response.data.slice(0, 10));
      })
      .catch((response) => {
        console.error(response);
      });
  }
  useEffect(() => {
    // 다이어리 불러오기
    diaryCall()

    // 게시판 불러오기
    boardCall()
  }, []);

  const [diaryContents, setDiaryContents] = useState([]);
  const [boardContents, setBoardContents] = useState([]);

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
    const myInfoApiUrl = `http://127.0.0.1:8000/api/myinfo/`;
    const myInfoApiCall = () => {
      // 로그인 유저 정보 불러오기
      let cookies = new Cookies();
      const userToken = cookies.get("usertoken");
      axios
        .get(myInfoApiUrl, { headers: { Authorization: `Token ${userToken}` } })
        .then((response) => {
          setUserInfo(response.data[0]);
          // console.log("로그인 유저", response.data[0]);
        })
        .catch((response) => {
          console.error(response);
        });
    };
    myInfoApiCall();
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
        <Typography variant="h5" color="" gutterBottom>
          요가요 피플 커뮤니티
        </Typography>
        <br />
        {/* <div>
          <span className={classes.tagIcon}> 요가</span>
          <span className={classes.tagIcon}>필테</span>
          <span className={classes.tagIcon}>중고장터</span>
          <span className={classes.tagIcon}>같이 운동해요</span>
        </div> */}
        <br />
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          className={classes.swiper}
        >
          {boardContents.map((content, index) => (
            <SwiperSlide key={index}>
              <BoardCard content={content} ellipsis={true} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography variant="h5" gutterBottom fontWeight="fontWeightBold">
          오늘 올라온 수련일기
        </Typography>
        <br />
        <br />
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          className={classes.swiper}
        >
          {diaryContents.map((content, index) => (
            <SwiperSlide className={classes.swiperSlide} key={index}>
              <DiaryCard content={content} ellipsis={true} apiCall={diaryCall}  />
            </SwiperSlide>
          ))}
        </Swiper>
        <br />
        
      </main>
    </React.Fragment>
  );
};

export default Main;
