import React from "react";
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
const useStyles = makeStyles(() => ({
  root: {
    overflow: "initial",
    maxWidth: 304,
    backgroundColor: "transparent",
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

export const DiaryCard = React.memo(function ReviewCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  return (
    <Card elevation={0} className={styles.root}>
      <CardMedia
        classes={mediaStyles}
        image={
          "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        }
      />
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <IconButton className={styles.favorite}>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <h3 className={styles.title}>아쉬탕가 중급</h3>
        <Box color={"grey.500"} display={"flex"} alignItems={"center"} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>요가왕 요가원</span>
        </Box>
        <Typography color={"textSecondary"} variant={"body2"}>
          오랜만의 아쉬탕가 수업이라 좀 버거웠다. 마리치아사나 C는 이제 한 80%
          정도 되는 것 같다. 오늘 빡부장이 갈궈서인지 명상 시간에 머릿 속이 많이
          어지러웠다. 내일은 조금 더 평안한 하루가 되길!
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
  );
});

export default DiaryCard;
