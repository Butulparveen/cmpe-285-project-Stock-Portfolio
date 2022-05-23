import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';



export class StockInputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {amount: 5000, strategies: [], loading: false};
  }

  changeAmount = e => {
    this.setState({amount: e.target.value});
  };

  changeStrategy  = strategy => event => {
    if(event.target.checked) {
      this.setState({strategies: this.state.strategies.concat(strategy)});
    } else {
      this.setState({strategies: this.state.strategies.filter( s => s !== strategy)});
    }
  };

  handleSubmit = () => {

    this.setState({"loading": true});
    this.props.actions.saveUserInput({amount: parseInt(this.state.amount), strategies:this.state.strategies}).then( () =>{
      this.setState({"loading": false});
    });
  };

  render() {
    const names = [
      "Ethical Investing",
      "Growth Investing",
      "Index Investing",
      "Quality Investing",
      "Value Investing"
    ];
    return (
      <div className="stock-input-form">
        <Typography variant="h6" className={"name"}>
          {"Welcome " + (this.props.name ? this.props.name: "")}
        </Typography>
        <Typography variant="h6" className={"title"}>
          {"Let's Get Started"}
        </Typography>
        <div className={"form-element"}>
          <FormControl fullWidth className={""}>
            <InputLabel htmlFor="standard-adornment-amount">Enter Investment Amount</InputLabel>
            <Input
              type="number"
              id="standard-adornment-amount"
              value={this.state.amount}
              onChange={this.changeAmount}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          {this.state.amount < 5000 &&
          <FormHelperText className={"fix-width"} error={true}>Minimum amount should be $5000</FormHelperText>}
          {this.state.amount >= 5000 &&
          <div className="fix-width"> </div>}
        </div>
        <div className={"form-element"}>
          <FormControl component="fieldset" className={""}>
            <FormLabel component="legend">Pick one or two investment Strategies</FormLabel>
            <FormGroup>
                  {names.map(name => (
                    <FormControlLabel
                      key={name}
                      control={<Checkbox color={"primary"} checked={this.state.strategies.indexOf(name) > -1}
                                         onChange={this.changeStrategy(name)} value={name} />}
                      label={name}
                    />
                  ))}
            </FormGroup>
            {this.state.strategies.length > 2 &&
            <FormHelperText className={"fix-width"} error={true}>Maximum two strategies can be picked at a time.</FormHelperText>}
            {this.state.strategies.length <= 2 &&
            <div className="fix-width"> </div>}
          </FormControl>

        </div>

        <Button disabled={this.state.strategies.length < 1 || this.state.strategies.length > 2
        || this.state.loading || this.state.amount<5000}
                variant="contained" color="primary" className={"form-element submit-button"}
                onClick={this.handleSubmit}>
          {this.state.loading && <CircularProgress size={24} />}
          Submit
        </Button>
      </div>
    );
  }
}

StockInputForm.propTypes = {
  actions: PropTypes.any,
  history: PropTypes.any,
  userInput: PropTypes.any,
  name: PropTypes.any
};
