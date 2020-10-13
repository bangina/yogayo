import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropDown from "../components/DropDown";
import { Button } from "@material-ui/core";
import { Cookies } from "react-cookie";
import axios from "axios";

import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    btn: { margin: theme.spacing(1) },
  },
}));

const InsertBoard = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState({
    category: "",
    title: "",
    content: "",
  });

  const [imgPath, setImgPath] = useState([])

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandler = () => {
    if (post.category == null || post.title == "" || post.content == "") {
      setAlert(true);
    } else {
      
      // 글 업로드
      let cookies = new Cookies();
      const userToken = cookies.get("usertoken");

      const formData = new FormData();
      formData.append("img_path", imgPath[0]);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("category", post.category);

      axios({
        method: "post",
        url: "http://localhost:8000/api/posts/",
        data: formData,
        headers: { "Authorization": `Token	 ${userToken}`, "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
          props.history.push("/board")
        })
        .catch(function (response) {
          console.log(response);
        });

    }
  };

  const [alert, setAlert] = useState(false);

  const onChangeFile = (e) => {
    setImgPath(e.target.files)
  };

  return (
    <form className={classes.root}>
      {alert && <Alert severity="error">모두 입력해 주세요</Alert>}

      <div>
        <DropDown
          title="말머리"
          value={["중고장터", "요가", "필라테스", "같이_운동해요", "기타"]}
          onChange={(value) => setPost({ ...post, category: value })}
        />

        <TextField
          name="title"
          label="제목"
          multiline
          fullWidth
          variant="outlined"
          value={post.title}
          onChange={(e) => onChangeHandler(e)}
        />

        <TextField
          name="content"
          label="내용"
          multiline
          fullWidth
          variant="outlined"
          rows={10}
          onChange={(e) => onChangeHandler(e)}
          value={post.contents}
        />

        <TextField
          type="file"
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeFile(e)}
        />

        <Button
          style={{ margin: "3px" }}
          className="write-btn"
          variant="contained"
          color="primary"
          onClick={() => onClickHandler()}
        >
          글쓰기
        </Button>
      </div>
    </form>
  );
};

export default InsertBoard;
