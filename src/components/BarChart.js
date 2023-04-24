import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BarChart({chartData}) {
  return (
    //calling react-chart-js barchart 
    <div><Bar data={chartData}/></div>
  )
}

export default BarChart