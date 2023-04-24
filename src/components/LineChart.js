//importing essentials
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function LineChart({chartData}) {
  return (
    
    <div>
      {/* calling line chart for displaying data */}
      <Line data={chartData}/>
      </div>
  )
}

export default LineChart