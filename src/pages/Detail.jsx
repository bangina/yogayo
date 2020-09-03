import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";

import Avatar from "@material-ui/core/Avatar";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from "@mui-treasury/components/info";
import { useChatzInfoStyles } from "@mui-treasury/styles/info/chatz";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useSelector } from "react-redux";

const Detail = (props) => {
  let postId = props.match.params.id;
  const avatarStyles2 = useDynamicAvatarStyles({ size: 72 });
  const post = useSelector(
    (state) => state.posts.filter((post) => post.id == postId)[0]
  );

  return (
    <div>
      <Paper>
        <CardContent>
          <TextInfoContent
            useStyles={useN01TextInfoContentStyles}
            overline={post.regiDate}
            heading={`[${post.header}] ${post.title}`}
            body={post.contents}
          />
        </CardContent>
        <Column gap={2}>
          <Row mt={2} alignItems={"center"}>
            <Item position={"middle"}>
              <Avatar
                classes={avatarStyles2}
                src={"https://avatarfiles.alphacoders.com/166/166630.jpg"}
              />
            </Item>
            <Info useStyles={useChatzInfoStyles}>
              <InfoTitle>Maria Illesaca</InfoTitle>
              <InfoSubtitle>Can you please send me more detail...</InfoSubtitle>
              <InfoCaption>10:45 AM</InfoCaption>
            </Info>
          </Row>
          <Row mt={2} alignItems={"center"}>
            <Item position={"middle"}>
              <Avatar
                classes={avatarStyles2}
                src={"https://avatarfiles.alphacoders.com/166/166630.jpg"}
              />
            </Item>
            <Info useStyles={useChatzInfoStyles}>
              <InfoTitle>Maria Illesaca</InfoTitle>
              <InfoSubtitle>Can you please send me more detail...</InfoSubtitle>
              <InfoCaption>10:45 AM</InfoCaption>
            </Info>
          </Row>
          <Row mt={2} alignItems={"center"}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                id="outlined-adornment-amount"
                endAdornment={
                  <InputAdornment position="end">
                    <Button variant="contained" color="primary">
                      Reply
                    </Button>
                  </InputAdornment>
                }
                placeholder="댓글을 입력하세요.."
              />
            </FormControl>
          </Row>
          <Row mt={2} alignItems={"center"}>
            <Button
              className="write-btn"
              variant="outlined"
              color="primary"
              onClick={() => props.history.goBack()}
            >
              뒤로가기
            </Button>
          </Row>
        </Column>
      </Paper>
    </div>
  );
};

export default Detail;
