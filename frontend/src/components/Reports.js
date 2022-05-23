import React from 'react';
import {bindActionCreators} from "redux";
import * as actions from "../actions/stockInputActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {LineBarAreaComposedChart} from "./LineBarChart";
import {StockPieChart} from "./StockPieChart";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import StockWidget from "./StockWidget";
// import StrategyWidget from "./StrategyWidget";

class Reports extends React.Component {

  constructor(props) {
    super(props);
  }

  getCompany = (key)=>{
    let company = {
      "AAPL" : "Apple Inc",
      "TSLA" : "Tesla Inc",
      "ADBE" : "Adobe Inc",
      "OXLC" : "Oxford Lane Capital Corp",
      "ECC": "Eagle Point CR/COM",
      "AMD": "Advanced Micro Devices, Inc",
      "VOO": "VANGUARD IX FUN/S&P 500",
      "VTI": "VANGUARD IX FUN",
      "ILTB": "ISHARES TR",
      "NVDA": "NVIDIA Corporation",
      "MU": "Micron Technology, Inc",
      "CSCO": "Cisco Systems, Inc",
      "INTC": "Intel Corporation",
      "BABA": "Alibaba Group Holding",
      "GE": "General Electric Company"
    };
    return company[key];
  };

  getRows = () => {
   let rows = [];
    let allocation = this.props.userInput.allocation ? this.props.userInput.allocation["allocation"] : {};
    let totalAllocation = this.props.userInput.allocation && Array.isArray(this.props.userInput.allocation.weekly_trend) &&
      this.props.userInput.allocation.weekly_trend.find(x=> x.name === "Latest Value")["Total Portfolio"];
    let counter = 0;
    for (let key of Object.keys(allocation)) {
      let holdingValue = allocation[key]["price"] * allocation[key]["stocks"];
      let holdingRatio = holdingValue/totalAllocation *100;
      rows.push(<TableRow key={counter}>
        <TableCell align="right">{key}</TableCell>
        <TableCell align="right">{this.getCompany(key)}</TableCell>
        <TableCell align="right">{allocation[key]["stocks"]}</TableCell>
        <TableCell align="right">${allocation[key]["price"].toFixed(2)}</TableCell>
        <TableCell align="right">${holdingValue.toFixed(3)}</TableCell>
        <TableCell align="right">{holdingRatio.toFixed(2)}%</TableCell>
        <TableCell align="right">{allocation[key]["strategy"]}</TableCell>
      </TableRow>);
      counter++;
    }

    return rows;
  };

  render() {
    return (
      <div className="report-container">
        {/*{!(this.props.userInput && this.props.userInput.allocation && this.props.userInput.allocation.weekly_trend) &&*/}
        {/*  <Paper className="welcome-container">*/}
        {/*  <Typography className="title" variant="h6">*/}
        {/*    Welcome, {this.props.name}*/}
        {/*  </Typography>*/}
        {/*  <Divider/>*/}
        {/*  <Typography className="welcome-para1">*/}
        {/*    Stock Portfolio is stock portfolio suggestion engine that helps you to diversify your investments in different stocks based on different strategies.*/}
        {/*    We classify different investing strategies as*/}
        {/*  </Typography>*/}
        {/*  <Typography className="welcome-para2">*/}
        {/*    <ul>*/}
        {/*      <li><b>Ethical Investing</b> refers to the practice of using one's ethical principles as the primary filter for the selection of securities investing. </li>*/}
        {/*      <li><b>Growth Investing</b> is an investment style and strategy that is focused on increasing an investor's capital.</li>*/}
        {/*      <li><b>Index Investing </b> portfolio is constructed to match or track the components of a financial market index, such as the Standard & Poor's 500 Index (S&P 500).</li>*/}
        {/*      <li><b>Quality Investing</b> is an investment style that can be viewed independent of value investing and growth Investing. A quality portfolio may therefore also contain stocks with Growth and Value attributes.</li>*/}
        {/*      <li><b>Value Investing</b> is an investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value. </li>*/}
        {/*    </ul>*/}
        {/*  </Typography>*/}

        {/*</Paper>}*/}

        {!(this.props.userInput && this.props.userInput.allocation && this.props.userInput.allocation.weekly_trend) &&
        <Paper className="stock-widget-container widget1">
          <Typography className="title" variant="h6">
            Latest Market Trend
          </Typography>
          <Divider/>
          <StockWidget/>
        </Paper>}

        {/*{!(this.props.userInput && this.props.userInput.allocation && this.props.userInput.allocation.weekly_trend) &&*/}
        {/*<Paper className="stock-widget-container">*/}
        {/*  <Typography className="title" variant="h6">*/}
        {/*    Stocks for Different Strategies*/}
        {/*  </Typography>*/}
        {/*  <Divider/>*/}
        {/*  <StrategyWidget/>*/}
        {/*</Paper>}*/}


        {this.props.userInput && this.props.userInput.allocation &&
        this.props.userInput.allocation.weekly_trend && this.props.userInput.allocation.allocation &&
        <Paper className="table-container">
          <Typography className="title" variant="h6">
            Stock Allocations Based On Strategies
          </Typography>
          <Divider/>
          <div className="table-parent">
            <Table className={"allocation-table"} aria-label="allocation table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Symbol</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Number of Stocks</TableCell>
                  <TableCell align="right">Latest Price</TableCell>
                  <TableCell align="right">Holding Value</TableCell>
                  <TableCell align="right">Holding Ratio</TableCell>
                  <TableCell align="right">Strategy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.getRows()}
              </TableBody>
            </Table>
          </div>
        </Paper>
        }


        {this.props.userInput && this.props.userInput.allocation &&
        this.props.userInput.allocation.pie_chart_data &&
        <Paper className="pie-paper">
          <Typography className="title" variant="h6">
            Holding Ratio
          </Typography>
          <Divider/>
          <StockPieChart data={this.props.userInput.allocation.pie_chart_data}/>
        </Paper>}

        {this.props.userInput && this.props.userInput.allocation &&
        this.props.userInput.allocation.weekly_trend &&
        <Paper className="chart-paper">
          <Typography className="title" variant="h6">
            Portfolio Weekly Trend
          </Typography>
          <Divider/>
          <LineBarAreaComposedChart data={this.props.userInput.allocation.weekly_trend}/>
        </Paper>}
        {this.props.userInput.error && <div>{this.props.userInput.error}</div>}
      </div>
    );
  }
}

Reports.propTypes = {
  actions: PropTypes.any,
  userInput: PropTypes.any,
  history: PropTypes.any,
  name: PropTypes.any
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
)(Reports);

