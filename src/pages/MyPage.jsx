import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import PlaceIcon from "@material-ui/icons/Place";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import { Cookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    minHeight:"270px"
  },
  title: {
   marginBottom: "2rem",
  //  fontWeight:"bold",
   color:"#555"
  },
  pos: {
    // marginBottom: 12,
  },
  innerBox:{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center", 
  },
  descText:{
    fontSize : "1rem",
    lineHeight:"1.7rem"
  },
  inputFile:{
    display: "none"
  },
  inputFileIcon:{
    border : "1px solid #f3717d",
    borderRadius:"50%",
    display: "inline-block",
    width: "40px",
    height: "40px",
    padding: "0",
    textAlign:"center", 
    position:"relative"
  },
  inputFileSvg:{
     position:"absolute",
     left:"50%",
     top:"50%",
     transform :"translate(-50%,-50%)"
  },
  inputFileText:{
    padding:" 3px 16px",
    fontSize: "0.875rem",
    minWidth: "64px",
    boxSizing: "border-box",
    border:"1px solid #f3717d",
    color:"#999",
    margin:"0 5px",
    borderRadius:"5px",
  },
  inputContainer:{
    border:"1px solid #f3717d",
    padding:"3px",
    borderRadius:"5px",
    display:"flex"
  }
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "100%",
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,225)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "#f3717d",
  },
  thumb: {
    display: "none",
  },
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const sliderStyles = useSliderStyles();
  const [userInfo, setUserInfo] = useState({phone:""})
  const [voucherInfo, setVoucherInfo] = useState({})
  const [imgPath, setImgPath] = useState(null);
  const [imgPathText, setImgPathText] = useState(null);
  const filePathText = useRef();
  const [code, setCode] = useState();
  const onChangeFile = (e) => {
    setImgPath(e.target.files);
    console.log(e.target.value);
    console.log(imgPath);
    console.log(filePathText.current.value);
    setImgPathText(e.target.value);
  };
  const paintImgPathText=()=>{
    filePathText.current.value= imgPathText;
  }

  const voucherChage = e => {
    setCode(e.target.value)
  }

  const voucherSubmit = () => {
    // console.log("new voucher : ", `http://127.0.0.1:8000/api/myvouchers/${code}`)
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/myvouchers/${code}`;
    axios({
      method: "post",
      url: apiUrl,
      data : {
        // user, voucher가 안들어가면 bad request 라고 떠서 아무 값이나 넣어준거고
        // 생성될때는 요청한 user와 인증번호 입력한 voucher로 생성됨
        user : 1,
        voucher : 1
      },
      headers: { "Authorization": `Token	 ${userToken}`},
    })
      .then(function (response) {
        console.log(response);
        voucherApiCall()
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  const userApiCall = () => {
    // 로그인 유저 정보 불러오기
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/myinfo/`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUserInfo(response.data[0]);
        console.log("로그인 유저", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const voucherApiCall = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/myvouchers/`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setVoucherInfo(response.data[0]);
        console.log("바우쳐정보 : ", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  }

  const onImgUpload = () => {
    console.log("url : ", `http://localhost:8000/api/myinfo/${userInfo.id}/`)
    let cookies = new Cookies();
      const userToken = cookies.get("usertoken");

      const formData = new FormData();
      formData.append("img_profile", imgPath[0]);

      axios({
        method: "patch",
        url: `http://localhost:8000/api/myinfo/${userInfo.id}/`,
        data: formData,
        headers: { "Authorization": `Token	 ${userToken}`, "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          setUserInfo(response.data);
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
  }

  useEffect(()=>{
    userApiCall();
    voucherApiCall()
  },[])

  useEffect(()=>{
    props.apiCall();
  },[userInfo])
  useEffect(()=>{
    paintImgPathText();
  },[imgPathText]);

//첨부 이미지 파일명 보여주기

const file = useRef();




  return (
    <div style={{ marginBottom: "15px" }}>
      <Typography variant="h4"  color="primary" gutterBottom>
        마이 페이지
      </Typography><br/>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card className={classes.root}>
            <CardContent>
              <div
                className={classes.innerBox}
              >
                <Typography component="h5" variant="h5" className={classes.title} gutterBottom>
                  나의 정보
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {userInfo.img_profile ? (
                  <Avatar style={{
                    width: "100px",
                    height: "100px",
                  }}>
                    <img src={userInfo.img_profile} style={{ width: "100px"}}/>
                  </Avatar>                  
                ) : (
                  <Avatar
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                )}
                
                <div style={{ marginLeft: "10px"}}  >
                  <Typography color="primary" className={classes.descText}><b>{userInfo.username}</b> 회원님</Typography> <br/> 
                  <Typography gutterBottom  className={classes.descText}>이메일 주소 : {userInfo.email}</Typography>
                  <Typography gutterBottom className={classes.descText}>휴대폰 번호 : {userInfo.phone.slice(0,3)}-{userInfo.phone.slice(3,7)}-{userInfo.phone.slice(7,11)}</Typography>
                  <div className={classes.inputContainer}>
                  <input type="file" id="file" className={classes.inputFile} onChange={onChangeFile}/>
                  <label for="file" className={classes.inputFileIcon}><PhotoCameraIcon color="primary" className={classes.inputFileSvg}/></label>
                  <input value="파일 주소" type="text" ref={filePathText} className={classes.inputFileText}/>
                  <Button onClick={onImgUpload} variant="contained" color="primary">사진 업로드</Button>
                  </div>
                  
                </div>
                
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item  xs={12} lg={6}> 
          <Card className={classes.root}>
            
              {voucherInfo ? (  
                <CardContent>
                  <Typography  component="h5" variant="h5" className={classes.title} gutterBottom>
                  이용 정보
                </Typography>
  
                <Typography gutterBottom>
                  <PlaceIcon /> 센터 : {voucherInfo.adminname}
                </Typography>
                <Typography>
                  <ConfirmationNumberIcon /> {voucherInfo.vouchername}
                </Typography>
                <Typography component="h2">이용권 {
                  voucherInfo.status ? "정상" : "사용불가"
                } (잔여횟수 {voucherInfo.limit - voucherInfo.used}회)</Typography>
                <Typography color="textSecondary" gutterBottom>
                  총 {voucherInfo.limit}회중 {voucherInfo.used}회 사용
                </Typography>
                <Slider classes={sliderStyles} value={(voucherInfo.used/voucherInfo.limit)*100} />
                <Typography variant="body2" component="p">
                  {String(voucherInfo.str_date).substring(0,10)} ~
                   
                </Typography>
                </CardContent>
              ) : (
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                  이용권 정보 없음!
                </Typography>
 
                <Typography className={classes.title} color="" gutterBottom>
                  인증번호 : 
                </Typography>
                <TextField id="outlined-basic" placeholder="인증번호" variant="outlined" value={code} onChange={e => voucherChage(e)}/>
                <Button
                      variant="contained"
                      color="primary"
                      onClick={() => voucherSubmit()}
                    >
                      등록
                    </Button>
                </CardContent>
              )}
              
            
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
