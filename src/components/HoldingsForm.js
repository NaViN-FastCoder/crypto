
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import data from "../Datas";
function HoldingsForm() {
  const [userData, setUserData] = useState(data);
  const chartData = {
 
    labels: Object.keys(userData) ,   datasets: [
      {
        data: [375, 375, 250],
        backgroundColor: ["green", "blue", "red"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      <label>Portfolio</label>
      <label>Total value:$1000</label>
      <Pie data={chartData} />
    </div>
  );
}

export default HoldingsForm;
