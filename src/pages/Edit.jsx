import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const useStyles = makeStyles((theme) => ({

    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  
const Edit = (props) => {
    const classes = useStyles();
    const onSave = () => {

    }

  return (
    <React.Fragment>
      <CssBaseline />
      
      <main>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            정보 수정
          </Typography>
         
          <React.Fragment>
            
              <React.Fragment>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <TextField
            // required
            id="address1"
            name="address1"
            label="이름"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="핸드폰번호"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="비밀번호"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="비밀번호 확인"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
                <div className={classes.buttons}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.history.push("/mypage")}
                    className={classes.button}
                  >
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                    className={classes.button}
                  >
                    저장
                  </Button>
                  
                </div>
                <div className={classes.buttons}>
                  
                  
                </div>
              </React.Fragment>
        
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Edit;