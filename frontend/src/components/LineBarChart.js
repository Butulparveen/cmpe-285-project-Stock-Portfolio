import React from 'react';
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from  'recharts';

export class LineBarAreaComposedChart extends React.Component{

  getLines = ()=> {
    let lines = [];
    let colors = ["#6a0dad", "#2E86C1", "#EC7063" , "#B03A2E", "#21618C", "#F4D03F"];
    if(!this.props.data || this.props.data.length === 0) {
      return lines;
    }
    let count = 0;
    for (let [key, value] of Object.entries(this.props.data[0])) {
      if(key !== "Total Portfolio" && key !== "name") {
        lines.push(<Line type='monotone' key={key} dataKey={key} stroke={colors[count]} activeDot={{ r: 8 }}/>)
        count++;
      }
    }
    return(lines);
  };

  render () {
    return (
      <ResponsiveContainer width={"100%"} height={400}>
        <ComposedChart data={this.props.data}
                       margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip/>
          <Legend/>
          <Area type='monotone' dataKey='Total Portfolio' fill='#F2F4F4' stroke='#145A32' />
          {this.getLines()}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
