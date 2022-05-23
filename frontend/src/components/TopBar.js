import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MultilineChart from '@material-ui/icons/MultilineChart';
import "../styles/styles.scss";
import {logout} from "../api/api";
import PropTypes from "prop-types";

export class TopBar extends React.Component{

  useStyles = ()=>{
    return makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }))
  };

  form_logout = async ()=>{
    this.props.actions.actionLogout().then(()=>{
      this.props.history.push("/");
      });
  };

  render(){
    const classes = this.useStyles();

    return (
      <div className={classes.root}>
        <AppBar className="top-app-bar" position="static">
          <Toolbar>
            <MultilineChart/>
            <Typography variant="h6" className={"title"}>
              Stock Portfolio
            </Typography>

            <div className="auth-toolbar">
              <Button className={"logout-button"} color="inherit" onClick={this.form_logout}>Logout</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

TopBar.propTypes = {
  history: PropTypes.any,
  actions:PropTypes.any
};
