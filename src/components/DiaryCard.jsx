import React, { useState } from "react";
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
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Favorite from "@material-ui/icons/Favorite";
import FaceGroup from "@mui-treasury/components/group/face";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    backgroundColor: "transparent",
    paddingBottom: "1rem",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
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
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
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
  const postLike = (e) => {
    const apiUrl = `http://127.0.0.1:8000/api/diaries/${e.target.id}/like`;
    axios.post(apiUrl).catch((response) => {
      console.error(response);
    });
  };

  return (
    <Card className={styles.root}>
      <Typography variant="h6" className={styles.date}>
        {/* {content.sessionDate.getMonth() + 1 < 10
          ? `0${content.sessionDate.getMonth() + 1}`
          : content.sessionDate.getMonth() + 1} */}
        월{" "}
        {/* {content.sessionDate.getDate() < 10
          ? `0${content.sessionDate.getDate()}`
          : content.sessionDate.getDate()} */}
        일
      </Typography>
      <div className={styles.imgBackground}>
        <CardMedia classes={mediaStyles} image={content.img_path} />
      </div>
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <IconButton className={styles.favorite}>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <h3 className={styles.title}>{content.lesson_name}</h3> {/*수업 이름*/}
        <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>{content.admin_name}</span>
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
                id={content.userLesson_id}
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
