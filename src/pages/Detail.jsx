import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Cookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  replyInput: {
    height: 50,
  },

  img : {
    marginTop: theme.spacing(2),
    maxWidth: "100%",
  }
}));

const Detail = (props) => {
  const classes = useStyles();
  let postId = props.match.params.id;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    post: postId,
    content: "",
  });

  const commentCall = () => {
    const commentApiUrl = `http://localhost:8000/api/posts/${postId}/comment`;
    axios
      .get(commentApiUrl)
      .then((response) => {
        console.log("댓글:", response.data);
        setComments(response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  useEffect(() => {
    const postApiUrl = `http://localhost:8000/api/posts/${postId}`;
    axios
      .get(postApiUrl)
      .then((response) => {
        console.log("조회목록데이터:", response.data);
        setPost(response.data);
      })
      .catch((response) => {
        console.error(response);
      });

    commentCall();
  }, []);

  const commentInputChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
  };

  const commentSubmit = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");

    console.log("저장된 쿠키토큰값:", userToken);

    axios({
      method: "post",
      url: `http://localhost:8000/api/posts/${postId}/comment/`,
      data: newComment,
      headers: {
        Authorization: `Token 	${userToken}`,
      },
      // headers: { "Content-Type": "multipart/form-data" }, //:파일데이터 보낼 때 컨텐츠 유형임.
    })
      .then(function (response) {
        console.log(response);
        setNewComment({ ...newComment, content: "" });
        commentCall();
      })
      .catch(function (response) {
        console.error(response);
      });
  };

  return (
    <div>
      <Paper>
        <CardContent>
          <TextInfoContent
            useStyles={useN01TextInfoContentStyles}
            overline={String(post.created).substring(0,10) + " " + post.username}
            heading={`[${post.category}] ${post.title}`}
            body={post.content}
          />
          <img src={post.img_path} className={classes.img} />
        </CardContent>
        <Divider />
        <Column gap={2}>
          {comments.map((comment, index) => {
            return (
              <Row mt={2} alignItems={"center"} key={index}>
                <Item position={"middle"}>
                  <Avatar>SB</Avatar>
                </Item>
                <Info useStyles={useChatzInfoStyles}>
                  <InfoTitle>{comment.username}</InfoTitle>
                  <InfoSubtitle>{comment.content}</InfoSubtitle>
                  <InfoCaption>{comment.created.substring(0, 10)}</InfoCaption>
                </Info>
              </Row>
            );
          })}

          <Row mt={2} alignItems={"center"}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                className={classes.replyInput}
                id="outlined-adornment-amount"
                value={newComment.content}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => commentSubmit()}
                    >
                      Reply
                    </Button>
                  </InputAdornment>
                }
                placeholder="댓글을 입력하세요.."
                onChange={(e) => commentInputChange(e)}
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
