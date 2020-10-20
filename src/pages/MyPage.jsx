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
import { Button, Divider } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
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
    background:"rgb(212, 61, 89)",
    cursor:"pointer"
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
    "& > input[type='text']":{
    padding:"10px 14px",
    }
  },
  table:{
    padding:"1rem",
    width:"100%",
  },
  tableRow:{
  },
  tableHeading:{
    paddingBottom:"1rem",
    fontSize:"1rem",
  },
  tableDetail:{
    padding:"10.5px",
    borderBottom:"1px solid rgba(0,0,0,0.1)",
    color:"#555",
    fontSize:"0.9rem",
    textIndent:"1rem",
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
  // 일반회원 보유 수강권(단일)
  const [voucherInfo, setVoucherInfo] = useState({})
  // 센터회원 수강권 리스트
  const [centerVouchers, setCenterVouchers] = useState([{
    id: "",
    limit: "",
    name: "",
    user: "",
    voucherCode: ""
  }
  ]);
  // 센터회원 수강권 추가(api 전송용)
  const [centerVoucherInfo, setCenterVoucherInfo] = useState({
    limit: "",
    name: "",
    user:""
  })
  // 센터회원 수업 추가(api 전송용)
  const [centerLessonInfo, setCenterLessonInfo] = useState({
    room: "",
    name: "",
    date: "",
    time:"",
    max_ppl:"",
  })
  // 센터회원 수업 리스트
  const [centerLessons, setCenterLessons] = useState([])
  const [code, setCode] = useState();

  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");
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
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const voucherCodeChange = e => {
    setCode(e.target.value)
  }
  const centerVoucherChange= e =>{
    setCenterVoucherInfo({...centerVoucherInfo,user:userInfo.id,[e.target.name]:e.target.value});
    console.log("centerVoucherInfo",centerVoucherInfo);
  }
  const centerLessonChange= e =>{
    setCenterLessonInfo({...centerLessonInfo,user:userInfo.id,[e.target.name]:e.target.value});
    console.log("centerLessonInfo",centerLessonInfo);
  }
  const voucherSubmit = () => {
    const apiUrl = `http://127.0.0.1:8000/api/myvouchers/${code}/`;
    axios({
      method: "post",
      url: apiUrl,
      data : {
          "status": true,
          "used": 0,
          "user": userInfo.id,
          "voucher": 1
      },
      headers: { "Authorization": `Token	 ${userToken}`},
    })
      .then(function (response) {
        console.log(response);
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
// 회원 보유한 바우쳐 정보 가져오기
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

  //  수강권 불러오기
  const VoucherApiUrl = `http://127.0.0.1:8000/api/voucher/`;
  const getVoucherApiCall = () => {
    axios
      .get(VoucherApiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setCenterVouchers(response.data);
        console.log("vouchers",response.data);
      })
      .catch((response) => {
        console.error(response);
      });
    }
  //  수강권 불러오기
  const LessonApiUrl = `http://127.0.0.1:8000/api/adminLesson/`;
  const getLessonApiCall = () => {
    axios
      .get(LessonApiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setCenterLessons(response.data);
        console.log("lessons",response.data);
      })
      .catch((response) => {
        console.error(response);
      });
    }
// 센터회원 수강권 추가하기
const createVoucher=()=>{
  const VoucherPostApiUrl = `http://127.0.0.1:8000/api/voucher/`;
  const postApiCall = () => {
    axios({
      method: "post",
      url: VoucherPostApiUrl,
      data: centerVoucherInfo,
      headers: {
        Authorization: `Token	${userToken}`,
      },
    })
    .then(function (response) {
      getVoucherApiCall();
    })
    .catch((response) => {
        console.error(response);
      });
    }
    postApiCall();
  };
// 센터회원 수업 추가하기
const createLesson=()=>{
  const LessonPostApiUrl = `http://127.0.0.1:8000/api/adminLesson/`;
  const postApiCall = () => {
    axios({
      method: "post",
      url: LessonPostApiUrl,
      data: centerLessonInfo,
      headers: {
        Authorization: `Token	${userToken}`,
      },
    })
    .then(function (response) {
      getLessonApiCall();
      console.log(response);
    })
    .catch((response) => {
        console.error(response);
      });
    }
    postApiCall();
  };
  useEffect(()=>{
      userApiCall();
      voucherApiCall();
    },[])

  useEffect(()=>{
    props.apiCall();
  },[userInfo])

  useEffect(()=>{
    getVoucherApiCall();
    getLessonApiCall();
  },[])



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
            <Typography  component="h5" variant="h5" className={classes.title} gutterBottom>
                  <b>회원권</b> 정보
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
                <TextField size="small" className={classes.codeInput}  placeholder="인증번호" variant="outlined" value={code} onChange={e => voucherCodeChange(e)}/>
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
      </Grid>
      {/* 센터회원 - 수강권 관리 */}
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Card className={classes.root}>
            <CardContent>
              <div
                className={classes.innerBox}
              >
                <Typography component="h5" variant="h5" className={classes.title} gutterBottom>
               <b>수강권</b> 관리
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              > 
              <table className={classes.table}>
                <tr className={classes.tableRow}>
                  <th className={classes.tableHeading}>수강권 이름</th>
                  <th className={classes.tableHeading}>수강권 횟수</th>
                  <th className={classes.tableHeading}>수강권 코드</th>
                  <th className={classes.tableHeading}></th>
                </tr>
                <tr className={classes.tableRow}>
                  <td><TextField required size="small" fullWidth className={classes.codeInput}  placeholder="수강권 이름" variant="outlined" value={centerVoucherInfo.name} name="name" onChange={e => centerVoucherChange(e)}/></td>
                  <td><TextField type="number" required size="small" fullWidth className={classes.codeInput}  placeholder="수강권 횟수" variant="outlined" value={centerVoucherInfo.limit} name="limit" onChange={e => centerVoucherChange(e)}/></td>
                  <td style={{color:"#999", textAlign:"center"}}>수강권 코드는 자동생성됩니다.</td>
                  <td><Button color="primary" variant="contained" size="medium" onClick={createVoucher}>추가하기</Button></td>
                </tr>
                {centerVouchers.map((voucher)=>
                 (<tr className={classes.tableRow}>
                    <td className={classes.tableDetail}>{voucher.name}</td>
                    <td className={classes.tableDetail}>{voucher.limit}회</td>
                    <td className={classes.tableDetail}>{voucher.voucherCode}</td>
                    <td className={classes.tableDetail}></td>
                  </tr>)
                )}
                
              </table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

              {/* 센터회원 수업 관리 */}
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Card className={classes.root}>
            <CardContent>
              <div
                className={classes.innerBox}
              >
                <Typography component="h5" variant="h5" className={classes.title} gutterBottom>
               <b>수업</b> 관리
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              > 
              <table className={classes.table}>
                <tr className={classes.tableRow}>
                  <th className={classes.tableHeading}>수업 이름</th><th className={classes.tableHeading}>강의실</th><th className={classes.tableHeading}>수업 일자</th><th className={classes.tableHeading}>수업 시작 시간</th><th className={classes.tableHeading}>정원</th>
                </tr>
                <tr className={classes.tableRow}>
                  <td><TextField required size="small" className={classes.codeInput}  placeholder="수업 이름" variant="outlined" value={centerLessonInfo.name} name="name" onChange={e => centerLessonChange(e)}/></td>
                  <td><TextField required size="small" className={classes.codeInput}  placeholder="강의실" variant="outlined" value={centerLessonInfo.room} name="room" onChange={e => centerLessonChange(e)}/></td>
                  <td><TextField type="date" required size="small" className={classes.codeInput}  placeholder="수업 일자" variant="outlined" value={centerLessonInfo.date} name="date" onChange={e => centerLessonChange(e)}/></td>
                  <td><TextField type="time" step="1" required size="small" className={classes.codeInput}  placeholder="수업 시작 시간" variant="outlined" value={centerLessonInfo.time} name="time" onChange={e => centerLessonChange(e)}/></td>
                  <td><TextField type="number" required size="small" className={classes.codeInput}  placeholder="정원" variant="outlined" value={centerLessonInfo.max_ppl} name="max_ppl" onChange={e => centerLessonChange(e)}/></td>
                  <td><Button color="primary" variant="contained" size="medium" onClick={createLesson}>추가하기</Button></td>
                </tr>
                {centerLessons.map((lesson)=>
                 (<tr className={classes.tableRow}>
                    <td className={classes.tableDetail}>{lesson.name}</td>
                    <td className={classes.tableDetail}>{lesson.room}</td>
                    <td className={classes.tableDetail}>{lesson.date}</td>
                    <td className={classes.tableDetail}>{lesson.time}</td>
                    <td className={classes.tableDetail}>{lesson.max_ppl}</td>
                  </tr>)
                )}
                
              </table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
