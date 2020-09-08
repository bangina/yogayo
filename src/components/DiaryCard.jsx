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
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(() => ({
  root: {
    overflow: "initial",
    maxWidth: 700,
    backgroundColor: "transparent",
    paddingBottom: "1rem",
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
  },
  imgBackground: {
    background: "#ff8177",
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

export const DiaryCard = (prop) => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  const content = prop.content;

  return (
    // <Grid item xs={12} md={6} lg={4} xl={3} key={content.id}>
      <Card elevation={1} className={styles.root}>
        <Typography variant="h6" className={styles.date}>
          {content.sessionDate.getMonth() + 1 < 10
            ? `0${content.sessionDate.getMonth() + 1}`
            : content.sessionDate.getMonth() + 1}
          월{" "}
          {content.sessionDate.getDate() + 1 < 10
            ? `0${content.sessionDate.getDate()}`
            : content.sessionDate.getDate()}
          일
        </Typography>
        <div className={styles.imgBackground}>
          <CardMedia
            classes={mediaStyles}
            image={`./img/diary_img_0${content.imgSrc}.png`}
          />
        </div>
        <CardContent className={cx(shadowStyles.root, styles.content)}>
          <IconButton className={styles.favorite}>
            <SentimentVerySatisfiedIcon />
          </IconButton>
          <h3 className={styles.title}>{content.sessionName}</h3>
          <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
            <LocationOn className={styles.locationIcon} />
            <span>요가왕 요가원</span>
          </Box>
          <Typography color={"textSecondary"} variant={"body2"}>
            {content.diaryText}
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
            ></Box>
            <IconButton size={"small"}>
              <MoreHoriz />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    // </Grid>
  );
};

export default DiaryCard;
