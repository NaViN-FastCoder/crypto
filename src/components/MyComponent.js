//importing essentials
import React, { useState, useEffect, useRef } from 'react';
import UsersService from '../services/users.service';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyComponent() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [graph,setGraph]=useState('LineChart');
  const vs_currency = 'usd'; 
  let currencies='bitcoin';
  
  const[startDate,setStartDate]=useState("1640995200");
  const[endDate,setEndDate]=useState("1662057599");
  const[chartLabel,setChartLabel]=useState('1M');
  const[currency,setCurrency]=useState('bitcoin');
  const chartRef=useRef(null);

  //calculating one day by setting same date from startdate to enddate
  const handleoneDayClick=()=>{
    const newDate=24*60*60;
    setStartDate(endDate-newDate);
    setChartLabel('1D');
  }
 //calculating one month by setting startdate to userspecified and enddate to one month from startdate
  const handleoneMonthClick=()=>{
    const newDate=30*24*60*60;
    setStartDate(endDate-newDate);
    
  }

  //calculating one year by setting startdate to userspecified and enddate to one year from startdate
  const handleoneYearClick=()=>{
    const newDate=365*24*60*60;
    setStartDate(endDate-newDate);
   
  }

//calculating one month by setting startdate to userspecified and enddate to one week from startdate

  const handleoneWeekClick=()=>{
    const newDate=7*24*60*60;
    setStartDate(endDate-newDate);
    setChartLabel('1W')
  }
  //calculating one month by setting startdate to userspecified and enddate to six months from startdate
  const handlesixMonthClick=()=>{
    const newDate=180*24*60*60;
    setStartDate(endDate-newDate);
    setChartLabel('6M')
  }
  
  //to check whether user wants data for bitcoin or tether or combination of both
  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    if (value === 'bitcoin,tether') {
      setCurrency('bitcoin,tether');
    } else {
      setCurrency(value);
    }
  }
//getting event values for graph change
  const handleGraphChange=(event)=>{
    setGraph(event.target.value);
  }
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
     
      if (currency === 'bitcoin')
        currencies = 'btc';
      else if (currency === 'tether')
        currencies = 'usd';
      else if(currency==='bitcoin,tether')
        currencies = 'btc,usd';
        //if user selects a combination of bitcoin and usd 
      if (currencies === 'btc,usd') {
        //getting data from users file from coingecko api
        Promise.all([
          UsersService.getAllUsersPrice('bitcoin', startDate, endDate),
          UsersService.getAllUsersPrice('tether', startDate, endDate)
        ]).then(([response1, response2]) => {
          console.log(response1);
          console.log(response2);
          //creating charts
          const marketChart1 = response1.data.prices.map(([date, price]) => ({ date, price }));
          const marketChart2 = response2.data.prices.map(([date, price]) => ({ date, price }));
          const marketChart = marketChart1.concat(marketChart2);
          const labels = {};
          const chartData = {
            title: 'usd',
            labels: marketChart2.reduce((acc, item) => {
              let date = new Date(item.date);
              if (!isNaN(date.getTime())) {
                let month = date.toLocaleString('default', { month: 'short' });
                if (!labels[month]) {
                  labels[month] = true;
                  acc.push(month);
                }
              }
              return acc;
            }, []),
            datasets: [
              {
                label: 'Bitcoin',
                data: marketChart1.map((item) => item.price),
              },
              {
                label: 'Tether',
                data: marketChart2.map((item) => item.price),
              },
            ],
          };
          setChartData(chartData);
        }).catch((error) => {
          setError(error);
        });
      }
      

      else{
        //checking currency if user selects a bitcoin or a tether
        if(currencies==='btc') currencies='bitcoin';
        if(currencies==='usd') currencies='tether';
    UsersService.getAllUsersPrice(currencies,startDate,endDate)
      .then((response) => {
        console.log(response);
        //chart data
        const marketChart = response.data.prices.map(([date, price]) => ({ date, price }));
        const chartData = {
          title:'usd',
          labels: marketChart.map((item) => {
            if(chartLabel=='1D'){
                return new Date(item.date).toLocaleDateString();
            }
            else if(chartLabel=='1W'){
                return new Date(item.date).toLocaleDateString(undefined,{month:'short',day:'numeric'})
            }
            else if (chartLabel == '6M') {
              const date = new Date(item.date);
              const year = date.getFullYear();
              const month = date.toLocaleString('default', { month: 'short' });
              return `${month} ${year}`;
            }
            
            else if (chartLabel == '1M') {
              const date = new Date(item.date);
              const year = date.getFullYear();
              const month = date.toLocaleString('default', { month: 'short' });
              return `${month} ${year}`;
            }
            
            else{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'short' });
            return `${month} ${year}`;}
          }),
          datasets: [
            {
              label: currencies,
              data: marketChart.map((item) => item.price),
            },
          ],
        };
        setChartData(chartData);
      })
      .catch((error) => {
        setError(error);
      });}
  },500);
  return()=>clearTimeout(delayDebounceFn);}, [currency,startDate,endDate,chartLabel,graph]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }



  return(
    <div>
    <div style={{ display: 'flex', gap: '10px' }}>
    <button className="bg-gray-200 text-black border border-black rounded-md w-12 h-full flex items-center justify-center"onClick={handleoneDayClick}>1D</button>
    <button className="bg-gray-200 text-black border border-black rounded-md w-12 h-full flex items-center justify-center" onClick={handleoneWeekClick}>1W</button>
    <button className="bg-gray-200 text-black border border-black rounded-md w-12 h-full flex items-center justify-center" onClick={handleoneMonthClick}>1M</button>
    <button className="bg-gray-200 text-black border border-black rounded-md w-12 h-full flex items-center justify-center"  onClick={handlesixMonthClick}>6M</button>
    <button className="bg-gray-200 text-black border border-black rounded-md w-12 h-full flex items-center justify-center" onClick={handleoneYearClick}>1y</button>
   
    <DatePicker className="bg-gray-200 text-black border border-black rounded-md w-24 h-full  flex items-center space-between" 
  selected={new Date(startDate * 1000)} 
  onChange={(date)=> {
    const timestamp = Math.floor(date.getTime() / 1000); // convert to Unix timestamp in seconds
    setStartDate(timestamp)
  }} 
  selectsStart 
  startDate={new Date(startDate * 1000)}
  endDate={new Date(endDate * 1000)}
/>

    
    <DatePicker className="bg-gray-200 text-black border border-black rounded-md w-1/2 h-full   flex " 
  selected={new Date(endDate * 1000)} 
  onChange={(date)=> {
    const timestamp = Math.floor(date.getTime() / 1000); // convert to Unix timestamp in seconds
    setEndDate(timestamp)
  }} 
  selectsEnd
  startDate={new Date(startDate * 1000)}
  endDate={new Date(endDate * 1000)}
/>

    
    <select className="bg-gray-200 text-black rounded-md w-30 pd-5  border border-black h-full flex items-center justify-center" onChange={handleCurrencyChange}>
      <option>Crytocurrency</option>
      <option  value='bitcoin'>Bitcoin</option>
      <option  value='tether'>Tether</option>
      <option value='bitcoin,tether' >Bitcoin,Tether</option>
    </select>
    
    <select className="bg-gray-200 text-black rounded-md w-30 h-full pd-5   border border-black flex items-center justify-center" value={graph}  onChange={handleGraphChange}>
      <option value='BarChart'>BarChart</option>
      <option value='LineChart'>LineChart</option>
    </select>
    </div>
    <label className="font-serif font-medium pd-10 mt-8 mr-8 ml-8">USD</label>
{graph==='BarChart' && chartData && <BarChart chartData={chartData}key={`${startDate}-${endDate}`}title="usd" />}
{graph==='LineChart' && chartData && <LineChart chartData={chartData}key={`${startDate}-${endDate}`}title="usd" />}

  </div>
  );
}



export default MyComponent;

