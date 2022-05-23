import React from 'react';
import {PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#21618C', '#F4D03F'];

const RADIAN = Math.PI / 180;

export class StockPieChart extends React.Component{

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {this.props.data[index].name +":"}{`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render () {
    return (
      <ResponsiveContainer>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            data={this.props.data}
            cx={180}
            cy={200}
            labelLine={false}
            label={this.renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
          >
            {
              this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
