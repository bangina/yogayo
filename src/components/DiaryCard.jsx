import React, { useState , useEffect} from "react";
import { Cookies } from "react-cookie";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import LocationOn from "@material-ui/icons/LocationOn";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    backgroundColor: "#fff",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
  },
  like:{
    fill : "rgb(212, 61, 89)"
  },
  unlike:{
    fill : "rgba(0, 0, 0, 0.54)"
  },
  imgBackground: {
    // background: "#ff8177",
  },
  date: {
    position: "absolute",
    right: "1rem",
    top: "0.5rem",
    color: "#fff",
    fontWeight: "light",
    textShadow: "3px 3px 4px rgba(0,0,0,0.2)",
    letterSpacing: "-0.05em",
  },
  title: {
    marginBottom: 0,
  },
  rateValue: {
    fontWeight: "bold",
    marginTop: 2,
  },
  content: {
    position: "relative",
    padding: 24,
    margin: "-24% 16px 0",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  content: {
    display: "block",
    display: "-webkit-box",
    WebkitLineClamp: "5",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    position : "relative"
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
}));

export const DiaryCard = (props) => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  const content = props.content;
  const ellipsis = props.ellipsis;
  const [diaryLiked,setDiaryLiked]=useState({id: content.id, liked:""});
  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");

  //좋아요 여부 체크
  const getLiked = (e) => {
    const apiUrl = `http://127.0.0.1:8000/api/diaries/${diaryLiked.id}/like/`;
    axios({
      method: "get",
      url: apiUrl,
      headers: {
        Authorization: `Token	${userToken}`,
      },
    })
    .then((response) => {
      setDiaryLiked({...diaryLiked, liked : response.data[0].id });
    })
    .catch((response) => {
      console.error(response);
    });
  };
  //좋아요 생성/삭제
  const postLike = (e) => {
    const apiUrl = `http://127.0.0.1:8000/api/diaries/${e.target.id}/like/`;
    axios({
      method: "post",
      url: apiUrl,
      headers: {
        Authorization: `Token	${userToken}`,
      },
    })
    .then((response) => {
      setDiaryLiked({...diaryLiked, liked : response.data.id});
      console.log("like 호출 결과 :", response);
    })
    .catch((response) => {
      console.error(response);
    });
  };

  useEffect(()=>{
    getLiked();
  },[])
  useEffect(()=>{
    props.apiCall();
  },[diaryLiked]);

  const paintMoodEmoji=(mood)=>{
    switch (mood) {
      case 0:
        return <SentimentVerySatisfiedIcon  color="primary"/>
      case 1:
        return <SentimentSatisfiedIcon  color="primary"/>
      case 2:
        return <SentimentVeryDissatisfiedIcon  color="primary"/>
      default: return <SentimentVerySatisfiedIcon  color="primary"/>
    }
  };
  return (
    <Card className={styles.root}>
      <Typography variant="h6" className={styles.date}>
          {content.created.substring(5,7)}
        월{" "}
          {content.created.substring(8,10)}
        일
      </Typography>
      <div className={styles.imgBackground}>
        <CardMedia classes={mediaStyles} image={content.img_path} />
      </div>
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <h3 className={styles.title}>{content.lesson_name}</h3>
        <IconButton className={styles.favorite}>
          {paintMoodEmoji(content.mood)}
        </IconButton>
        <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>{content.admin_name}</span>
        </Box>
        <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
          {/* <FaceGroup className={styles.locationIcon} /> */}
          <span>{content.username}</span>
        </Box>
        <Typography
          color={"textSecondary"}
          variant={"body2"}
          className={ellipsis ? cx(styles.content) : ""}
        >
          {content.content}
        </Typography>
        <Box
          mt={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            className={gutterStyles.parent}
          >
            <IconButton size={"small"}>
              <FavoriteBorderIcon
                onClick={postLike}
                id={content.id}
                className={diaryLiked.liked? styles.like : styles.unlike}
              />
              <span>{content.likes}</span>
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
