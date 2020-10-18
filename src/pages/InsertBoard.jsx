import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropDown from "../components/DropDown";
import { Button } from "@material-ui/core";
import { Cookies } from "react-cookie";
import axios from "axios";
import { openResultModal} from "../redux/modal";
import { useDispatch } from "react-redux";
import ResultModal from "../components/modal/ResultModal";

import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";

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
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    category: "",
    title: "",
    content: "",
  });

  const [imgPath, setImgPath] = useState({
    img_path1 : null,
    img_path2 : null,
    img_path3 : null,
    img_path4 : null,
  })

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
      if(imgPath.img_path1 != null){
        formData.append("img_path1", imgPath.img_path1[0]);
      }
      if(imgPath.img_path2 != null){
        formData.append("img_path2", imgPath.img_path2[0]);
      }
      if(imgPath.img_path3 != null){
        formData.append("img_path3", imgPath.img_path3[0]);
      }
      if(imgPath.img_path4 != null){
        formData.append("img_path4", imgPath.img_path4[0]);
      }
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
          dispatch(openResultModal());
        })
        .catch(function (response) {
          console.log(response);
        });

    }
  };

  const [alert, setAlert] = useState(false);

  const onChangeFile = (e) => {
    setImgPath({
      ...imgPath, [e.target.name] : e.target.files
    })
  };

  useEffect(()=>{
    if(props.modifyPost){
      console.log("수정", props)
    }
  },[])

  return (
    <>
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
          name="img_path1"
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeFile(e)}
        />
        <TextField
          type="file"
          name="img_path2"
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeFile(e)}
        />
        <TextField
          type="file"
          name="img_path3"
          fullWidth
          variant="outlined"
          onChange={(e) => onChangeFile(e)}
        />
        <TextField
          type="file"
          name="img_path4"
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
    <ResultModal directTo="/board" message="정상적으로 게시되었습니다."  header="요가요 커뮤니티"/>
    </>
  );
};

export default InsertBoard;
