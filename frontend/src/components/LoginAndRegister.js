import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import "../styles/login.scss";
import {login, signup} from "../api/api";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as actions from "../actions/stockInputActions";
import {connect} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';


class LoginAndRegister extends React.Component{

  constructor(props) {
    super(props);
    this.state = {fn:"", ln:"",email: "", password: "", login: true, loading: false, error: null};
  }

  form_login = async ()=> {
    let response = await login(this.state.email, this.state.password);
    console.log(response);
    let response_json = await response.json();
    console.log(response_json);
    if(response_json.error){
      this.setState({error: response_json.error});
    }else {
      this.setState({error: "User Logged in successfully. Redirecting to dashboards."});
      setTimeout(()=>{
        this.props.history.push("/dashboard");
      }, 2000);
    }
  };

  form__signup = async ()=> {
    let response = await signup(this.state.email, this.state.password, this.state.fn, this.state.ln);
    console.log(response);
    let response_json = await response.json();
    console.log(response_json);
    if(response_json.error){
      this.setState({error: response_json.error});
    }else {
      this.setState({error: "User Signed up successfully. Redirecting to dashboards."});
      setTimeout(()=>{
        this.props.history.push("/dashboard");
      }, 2000);
    }
  };

  changeForm = ()=>{
    this.setState({
      login: !this.state.login
    });
  };

  changeEmail = (e)=>{
    this.setState({
      email: e.target.value
    });
  };

  changePassword = (e)=>{
    this.setState({
      password: e.target.value
    });
  };

  closeError = ()=>{
    this.setState({
      error: null
    });
  };

  changeFn = (e)=>{
    this.setState({
      fn: e.target.value
    });
  };

  changeLn = (e)=>{
    this.setState({
      ln: e.target.value
    });
  };

  render(){
    return (
      <div className="login-page-container">
        <div className="form-container">
          <Typography className="title" variant="h6">
            {this.state.login? "Sign In" : "Sign Up"}
          </Typography>

          {!this.state.login &&
          <div className="form-input">
            <TextField
              className="fn"
              label="First Name"
              type="text"
              variant="outlined"
              required
              onChange={this.changeFn}
              value={this.state.fn}
            />
            <TextField
              className="ln"
              label="Last Name"
              type="text"
              variant="outlined"
              required
              onChange={this.changeLn}
              value={this.state.ln}
            />
          </div>}



          <TextField
            className="form-input"
            label="Email Address"
            type="text"
            autoComplete="email"
            variant="outlined"
            required
            onChange={this.changeEmail}
            value={this.state.email}
          />
          <TextField
            className="form-input"
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={this.changePassword}
            value={this.state.password}
          />

          {this.state.login &&
          <Button className="form-submit" variant="contained" color="primary" onClick={this.form_login}>
            SIGN IN
          </Button>}

          {!this.state.login &&
          <Button className="form-submit" variant="contained" color="primary" onClick={this.form__signup}>
            SIGN UP
          </Button>}

          {this.state.login &&
          <Link href="#" onClick={this.changeForm} className={"form-change"}>
            {"Don't have an account? Sign Up"}
          </Link>}

          {!this.state.login &&
          <Link href="#" onClick={this.changeForm} className={"form-change"}>
            {"Already have an account? Sign In"}
          </Link>}

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.error}
            autoHideDuration={6000}
            onClose={this.closeError}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.error}</span>}
          />

        </div>
      </div>
    );
  }

}

LoginAndRegister.propTypes = {
  history: PropTypes.any
};

function mapStateToProps(state) {
  return {
    userInput: state.userInputReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAndRegister);

