import { Pie } from 'react-chartjs-2';
import React, { Component } from 'react';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
        'Low Usage',
        'Too Small',
        'Pricing',
        'Medium Usage',
        'High Usage'
      ],
      datasets: [
        {
          data: [2000, 4000, 2850, 4000, 3000],
          backgroundColor: [
            '#1C5DE1',
            '#3CD278',
            '#7747E3',
            '#F89672',
            '#F7D68A'
          ]
        }
      ]
    };
  }

  render() {
    const options = {
      legend: {
        display: true,
        position: 'right'
      }
    };
    let title = this.props.title;
    return (
      <div>
        <h1 style={{ marginBottom: '47px' }}>{title}</h1>
        <Pie
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets
          }}
          options={options} />
        <br />
      </div>
    );
  }
}

export default PieChart;
