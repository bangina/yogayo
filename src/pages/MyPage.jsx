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
  },
  title: {
   marginBottom: "2rem",
   color:"#555",
   position:"relative",
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
  imgUploadBox:{
    position:"relative",
  },
  inputFile:{
    display: "none"
  },
  inputFileIcon:{
    borderRadius:"50%",
    display: "inline-block",
    width: "30px",
    height: "30px",
    padding: "0",
    textAlign:"center", 
    position:"relative",
    background:"rgb(212, 61, 89)"
  },
  inputFileSvg:{
     position:"absolute",
     left:"50%",
     top:"50%",
     transform :"translate(-50%,-50%)",
     color:"#fff"
  },
  inputContainer:{
    padding:"3px",
    borderRadius:"5px",
    display:"flex",
    width:"36px",
    position :"absolute",
    right:"0px",
    top:"0px",
    cursor:"pointer"
  },
  voucherStatBox:{
    display:"inline-block",
    padding:"20px",
    textAlign:"center",
    borderRadius:"20px",
    border:"1px solid rgb(212, 61, 89)",
    letterSpacing:"0.02em"
  },
  voucherInfo:{
    display:"inline-block",
    marginLeft:"20px",
  },
  svgIcon:{
    transform:"translateY(6px)"
  },
  voucherDetail:{
    marginTop:"2rem",
    textAlign:"center"
  },
  codeInput:{
    margin:"0 10px",
    "& > input[type='text']":{
    padding:"10px 14px"
    }
  }
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    width: "calc(100% - 8rem)",
    transform:"translateY(7px)",
  },
  rail: {
    borderRadius: 10,
    height: 8,
    backgroundColor: "#444",
    boxShadow:"2px 2px 3px rgba(0,0,0,0.3)"
  },
  track: {
    borderRadius: 10,
    height: 8,
    backgroundColor: "rgb(207, 85, 108)",
    opacity:"0.8"
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
  const [code, setCode] = useState();
  const onChangeFile = (e) => {
    
    const formData = new FormData();
    formData.append("img_profile", e.target.files[0]);

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
  };

  const voucherChage = e => {
    setCode(e.target.value)
  }

  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");
  const voucherSubmit = () => {
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
  useEffect(()=>{
    userApiCall();
    voucherApiCall()
  },[])

  useEffect(()=>{
    props.apiCall();
  },[userInfo])
//첨부 이미지 파일명 보여주기

const file = useRef();




  return (
    <div style={{ marginBottom: "15px" }}>
      <Typography variant="h4"  color="primary" gutterBottom>
        마이 페이지
      </Typography><br/>
      <Grid container spacing={3}>
        <Grid item xs={12} >
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
                <div className={classes.imgUploadBox}>
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
                <div className={classes.inputContainer}>
                    <input  type="file" id="file" className={classes.inputFile} onChange={onChangeFile}/>
                    <label for="file" className={classes.inputFileIcon}><PhotoCameraIcon color="primary" className={classes.inputFileSvg} fontSize="small"/></label>
                </div>
                </div>
                <div style={{ marginLeft: "20px"}}  >
                    <Typography  className={classes.descText}><b>{userInfo.username}</b> 회원님</Typography> <br/> 
                    <Typography gutterBottom  className={classes.descText}> • &nbsp; 이메일 주소 : {userInfo.email}</Typography>
                    <Typography gutterBottom className={classes.descText}> • &nbsp; 휴대폰 번호 : {userInfo.phone.slice(0,3)}-{userInfo.phone.slice(3,7)}-{userInfo.phone.slice(7,11)}</Typography>
                </div>
                
              </div>
           <br/>
            <hr/>
            <br/>
            <Typography  component="h5" variant="h5" className={classes.title} gutterBottom>
                  회원권 정보
                </Typography>
           {voucherInfo ? (  
                <>
                 
                <Typography color="primary" className={classes.voucherStatBox}>이용권 {
                  voucherInfo.status ? "정상" : "사용불가"
                } <br/>(잔여횟수 {voucherInfo.limit - voucherInfo.used}회)</Typography>
                <Typography gutterBottom className={classes.voucherInfo}>
                  <PlaceIcon color="primary" className={classes.svgIcon}/> 센터 : {voucherInfo.adminname}<br/>
                  <ConfirmationNumberIcon  color="primary" className={classes.svgIcon}/> {voucherInfo.vouchername}
                </Typography>
                <br/><br/>
                <Slider classes={sliderStyles} value={(voucherInfo.used/voucherInfo.limit)*100}/>
                <span style={{paddingLeft:"10px", color:"#666"}}>총 {voucherInfo.used}회 / {voucherInfo.limit}회 사용</span>
                <br/>
                </>
              ) : (
                <>
                  <Typography color="primary" gutterBottom>
                  이용 가능한 회원권이 없습니다. <br/> 센터에서 제공받은 회원권 코드를 입력해주세요.
                </Typography>
                  <br/>
                  회원권 코드 : 
                <TextField size="small" className={classes.codeInput}  placeholder="인증번호" variant="outlined" value={code} onChange={e => voucherChage(e)}/>
                <Button
                      variant="contained"
                      color="primary"
                      onClick={() => voucherSubmit()}
                    >
                      등록
                    </Button>
                    </>
              )}

            </CardContent>
          </Card>
        </Grid>
        <Grid item  xs={12}> 
          <Card className={classes.root}>
            
              
            
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
