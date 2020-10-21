import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropDown from "../components/DropDown";
import { Button, Typography } from "@material-ui/core";
import { Cookies } from "react-cookie";
import axios from "axios";
import { openResultModal } from "../redux/modal";
import { useDispatch } from "react-redux";
import ResultModal from "../components/modal/ResultModal";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import styled from "styled-components";
import { Divider } from "@material-ui/core";

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    "& .MuiTextField-root": {
      margin: "8px 0",
    },
  },
  uploadContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "700px",
    margin: "auto",
  },
  uploadInput: {
    display: "none",
  },
  uploadBox: {
    border: "1px solid rgba(207, 85, 108,0.5)",
    background: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    verticalAlign: "middle",
    flex: "0 0 48%",
    marginBottom: "8px",
    minHeight: "200px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    // boxShadow:"2px 2px 3px rgba(0,0,0,0.1)"
  },
  uploadBtn: {
    display: "inline-block",
    padding: "0",
    color: "rgb(207, 85, 108)",
    textAlign: "center",
    cursor: "pointer",
  },
  photoBox: {
    width: "100%",
  },
  thumbnail: {
    width: "100%",
    marginTop: "1rem",
    borderRadius: "10px",
    display: "none",
  },
  submitBtn: {
    margin: "3rem auto",
    width: "50%",
    left: "50%",
    transform: "translateX(-50%)",
    lineHeight: "2rem",
  },
}));

const InsertBoard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [post, setPost] = useState({
    category: "",
    title: "",
    content: "",
  });
  const [imgPath, setImgPath] = useState({
    img_path1: null,
    img_path2: null,
    img_path3: null,
    img_path4: null,
  });

  const thumbnailRef1 = useRef();
  const thumbnailRef2 = useRef();
  const thumbnailRef3 = useRef();
  const thumbnailRef4 = useRef();
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
      if (imgPath.img_path1 != null) {
        formData.append("img_path1", imgPath.img_path1[0]);
      }
      if (imgPath.img_path2 != null) {
        formData.append("img_path2", imgPath.img_path2[0]);
      }
      if (imgPath.img_path3 != null) {
        formData.append("img_path3", imgPath.img_path3[0]);
      }
      if (imgPath.img_path4 != null) {
        formData.append("img_path4", imgPath.img_path4[0]);
      }
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("category", post.category);

      axios({
        method: "post",
        url: "http://api.yogayo.kr/api/posts/",
        data: formData,
        headers: {
          Authorization: `Token	 ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
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

  const onChangeFile = (e) => {
    setImgPath({
      ...imgPath,
      [e.target.name]: e.target.files,
    });
    //업로드한 이미지 썸네일 표시하기
    const refNum = e.target.name.slice(8, 9);

    if (e.target.files[0]) {
      const reader = new FileReader();
      switch (refNum) {
        case "1":
          thumbnailRef1.current.style.display = "block";
          reader.onload = function (e) {
            thumbnailRef1.current.src = e.target.result;
          };
          break;
        case "2":
          thumbnailRef2.current.style.display = "block";
          reader.onload = function (e) {
            thumbnailRef2.current.src = e.target.result;
          };
          break;
        case "3":
          thumbnailRef3.current.style.display = "block";
          reader.onload = function (e) {
            thumbnailRef3.current.src = e.target.result;
          };
          break;
        case "4":
          thumbnailRef4.current.style.display = "block";
          reader.onload = function (e) {
            thumbnailRef4.current.src = e.target.result;
          };
          break;
        default:
          break;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (props.modifyPost) {
      console.log("수정", props);
    }
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        게시물 작성
      </Typography>
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
          <br />
          <br />
          <Typography variant="h6" gutterBottom color="primary">
            이미지 첨부
          </Typography>
          <Typography gutterBottom color="textSecondary">
            이미지는 총 4장까지 첨부 가능합니다.
          </Typography>
          <br />
          {/* 이미지 첨부  */}
          <div className={classes.uploadContainer}>
            <input
              type="file"
              name="img_path1"
              id="imgUpload1"
              을
              thumbnail="thumbnailRef1"
              onChange={(e) => onChangeFile(e)}
              className={classes.uploadInput}
            />
            <div className={classes.uploadBox}>
              <label htmlFor="imgUpload1" className={classes.uploadBtn}>
                <PhotoCameraIcon fontSize="large" />
              </label>
              <div className={classes.photoBox}>
                <img
                  ref={thumbnailRef1}
                  src=""
                  alt="썸네일"
                  className={classes.thumbnail}
                />
              </div>
            </div>
            <input
              type="file"
              name="img_path2"
              id="imgUpload2"
              onChange={(e) => onChangeFile(e)}
              className={classes.uploadInput}
            />
            <div className={classes.uploadBox}>
              <label htmlFor="imgUpload2" className={classes.uploadBtn}>
                <PhotoCameraIcon fontSize="large" />
              </label>
              <div className={classes.photoBox}>
                <img
                  ref={thumbnailRef2}
                  src=""
                  alt="썸네일"
                  className={classes.thumbnail}
                />
              </div>
            </div>
            <input
              type="file"
              name="img_path3"
              id="imgUpload3"
              onChange={(e) => onChangeFile(e)}
              className={classes.uploadInput}
            />
            <div className={classes.uploadBox}>
              <label htmlFor="imgUpload3" className={classes.uploadBtn}>
                <PhotoCameraIcon fontSize="large" />
              </label>
              <div className={classes.photoBox}>
                <img
                  ref={thumbnailRef3}
                  src=""
                  alt="썸네일"
                  className={classes.thumbnail}
                />
              </div>
            </div>
            <input
              type="file"
              name="img_path4"
              id="imgUpload4"
              onChange={(e) => onChangeFile(e)}
              className={classes.uploadInput}
            />
            <div className={classes.uploadBox}>
              <label htmlFor="imgUpload4" className={classes.uploadBtn}>
                <PhotoCameraIcon fontSize="large" />
              </label>
              <div className={classes.photoBox}>
                <img
                  ref={thumbnailRef4}
                  src=""
                  alt="썸네일"
                  className={classes.thumbnail}
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <Divider style={{ maxWidth: "700px", margin: "auto" }} />
          <StyledButton
            className={classes.submitBtn}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => onClickHandler()}
          >
            글쓰기
          </StyledButton>
        </div>
      </form>
      <ResultModal
        directTo="/board"
        message="정상적으로 게시되었습니다."
        header="요가요 커뮤니티"
      />
    </>
  );
};

export default InsertBoard;
