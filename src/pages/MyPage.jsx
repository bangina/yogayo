import React, {useState, useEffect} from "react";
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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import { Cookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    // background: "#f3717d",
    // color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
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
  // const bull = <span className={classes.bullet}>•</span>;
  const [userInfo, setUserInfo] = useState({})
  const [voucherInfo, setVoucherInfo] = useState({})
  const [imgPath, setImgPath] = useState(null)
  const [newVoucher, setNewVoucher] = useState({
    status: true,
    used: 0,
    voucher: ''
  })
  const onChangeFile = (e) => {
    setImgPath(e.target.files)
  };

  const voucherChage = e => {
    setNewVoucher({...newVoucher, voucher : e.target.value});
  }

  const voucherSubmit = () => {
    console.log("new voucher : ", newVoucher)
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/myvouchers/`;
    axios({
      method: "post",
      url: apiUrl,
      data: newVoucher,
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
        setNewVoucher({...newVoucher,user : response.data[0].id})
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
    setNewVoucher({...newVoucher, user: userInfo.id})
  },[userInfo])



  return (
    <div style={{ marginBottom: "15px" }}>
      <Typography variant="h4" color="" gutterBottom>
        마이 페이지
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography className={classes.title} gutterBottom>
                  나의 정보
                </Typography>
                <RouterLink to="/mypage/edit">
                  <Button variant="outlined">정보 변경하기</Button>
                </RouterLink>
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
                
                <div style={{ marginLeft: "10px"}}>
                  <Typography><b>{userInfo.username}</b> 회원님</Typography>
                  <Typography gutterBottom>{userInfo.email}</Typography>
                  <Typography gutterBottom>{userInfo.phone}</Typography>
                  <input type="file" onChange={e => onChangeFile(e)}/><button onClick={onImgUpload}>submit</button>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.root}>
            
              {voucherInfo ? (
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                  이용 정보
                </Typography>
  
                <Typography className={classes.title} color="" gutterBottom>
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
                <TextField id="outlined-basic" placeholder="인증번호" variant="outlined" value={newVoucher.voucher} onChange={e => voucherChage(e)}/>
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
