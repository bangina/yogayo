import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import cx from "clsx";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      paddingLeft: 0,
      minWidth: 288,
      borderRadius: 12,
      boxShadow: "0 2px 4px 2px rgba(138, 148, 159, 0.2)",
      marginBottom: "10px",
      paddingBottom: "10px",
      "& > *": {
        padding: spacing(1),
      },
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 20,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 14,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
    color1: {
      color: "#fff",
      backgroundColor: "rgb(207,85,108)",
    },
  };
});
const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "70%",
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,216)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(207,85,108)",
  },
  thumb: {
    display: "none",
  },
}));

const BookingCard = (props) => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  const session = props.session;
  const [lessonId, setLessonId] = useState();
  const type = props.type;

  //booking/cancel타입 각각 내려주는 prop.session의 필드가 다르므로 케이스별로 필드명 구분지어줌
  const returnLessonId = () => {
    if (type === "booking") {
      setLessonId(session.id);
    } else if (type === "cancel" || type === "diary") {
      setLessonId(session.lesson);
    }
  };
  const [usersList, setUsersList] = useState([]);
  let history = useHistory();
  const handleSubmit = () => {
    history.push("/mybookings");
  };
  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");
  const BookingApiUrl = `http://api.yogayo.kr/api/lesson/${lessonId}/`;
  const apiCall = () => {
    axios
      .get(BookingApiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUsersList(response.data);
        console.log("수강신청한 회원목록 호출 결과 :", response);
      })
      .catch((error) => {
        console.error("수강신청한 회원목록 호출 결과 :", error);
      });
  };
  useEffect(() => {
    returnLessonId();
  }, []);
  return (
    <>
      <React.Fragment key={session.id} session={session}>
        <Card className={cx(styles.card)} elevation={0}>
          <CardContent>
            <CardMedia
              image="/static/images/cards/live-from-space.jpg"
              title="Live from space album cover"
            ></CardMedia>
          </CardContent>
          <Box>
            <h3 className={styles.heading}>{session.name}</h3>
            <p>
              수업일시&nbsp; • &nbsp;
              {session.date.slice(5, 7)}월 {session.date.slice(8, 10)}
              일&nbsp;
              {session.time.slice(0, 5)}
            </p>
            <p className={styles.subheader}>{session.room}</p>
            {/* <Box display={"flex"} alignItems={"center"}>
              <Slider
                classes={sliderStyles}
                value={(usersList.length / session.max_ppl) * 100}
              />
              <span className={styles.value}>
                {usersList.length}/{session.max_ppl}명 신청
              </span>
            </Box> */}
            <Box style={{ display: "inline-block" }}>
              <Button
                color="primary"
                onClick={handleSubmit}
                value={session.id}
                variant="outlined"
              >
                내 스케쥴 확인하기
              </Button>
            </Box>
          </Box>
        </Card>
      </React.Fragment>
    </>
  );
};

export default BookingCard;
