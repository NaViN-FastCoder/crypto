//importing essentials
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import data from "../Datas";
function HoldingsForm() {
  const [userData, setUserData] = useState(data);
  
  //chart data
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
    {/* calling divs for displaying data */}
      
    <div style={{ width: 700, display: 'flex', gap: '150px' }}>
       
       <h1 className="text-10xl font-bold ">
       Portfolio
   </h1>
   <h1 className="text-10xl font-bold ">
   Total value:$1000
   </h1>
   </div>
   <>
     <div pd-5 pt-2rem pb-5 mt-8 mb-0 justify-center>
      {/* calling pi-chart from react-chart-js */}
      <Pie data={chartData} options={{ maintainAspectRatio: false, responsive: false, radius: "100%" }} />
      </div>
      </>
    </div>

  );
}

export default HoldingsForm;
