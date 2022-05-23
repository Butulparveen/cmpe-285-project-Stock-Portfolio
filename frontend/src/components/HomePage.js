import React from 'react';
import {StockInputForm} from "./StockInputForm";
import {bindActionCreators} from "redux";
import * as actions from "../actions/stockInputActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Reports from "./Reports";
import Widget from "./Widget";
import {TopBar} from "./TopBar";
import {checksession} from "../api/api";

export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name:""};
  }

  componentDidMount = () => {
    if(process.env.NODE_ENV === 'production') {
      checksession().then(
        response => {
          if (response.status === 500) {
            setTimeout(() => {
              this.props.history.push("/");
            }, 1000);
          } else {
            response.json().then(
              json => {
                if(json.name) {
                  this.setState({name: json.name});
                }
              });
          }
        });
    }
  };

  render() {
    return (
      <div className="home-page">
        <TopBar actions={this.props.actions} history={this.props.history}/>

        <div className="input-form">
          <StockInputForm {...this.props} name={this.state.name}/>
        </div>

        <div className="reports">
          <Widget/>
          <Reports name={this.state.name} />
        </div>


        {this.props.userInput.error && <div>{this.props.userInput.error}</div>}
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.any,
  userInput: PropTypes.any,
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
)(HomePage);

