import React, { useState, useEffect, useRef } from 'react';
import UsersService from '../services/users.service';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

function MyComponent() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [graph,setGraph]=useState('LineChart');
  const vs_currency = 'usd'; 
  
  const[startDate,setStartDate]=useState("1640995200");
  const[endDate,setEndDate]=useState("1662057599");
  const[chartLabel,setChartLabel]=useState('1M');
  const[currency,setCurrency]=useState('bitcoin');
  const chartRef=useRef(null);

  const handleoneDayClick=()=>{
    const newDate=24*60*60;
    setStartDate(endDate-newDate);
    setChartLabel('1D');
  }

  const handleoneMonthClick=()=>{
    const newDate=30*24*60*60;
    setStartDate(endDate-newDate);
    
  }
  const handleoneYearClick=()=>{
    const newDate=365*24*60*60;
    setStartDate(endDate-newDate);
   
  }
  const handleoneWeekClick=()=>{
    const newDate=7*24*60*60;
    setStartDate(endDate-newDate);
    setChartLabel('1W')
  }
  
  const handleCurrencyChange = (event) => {
    const value = event.target.value;
    if (value === 'bitcoin,tether') {
      setCurrency('bitcoin,tether');
    } else {
      setCurrency(value);
    }
  }

  const handleGraphChange=(event)=>{
    setGraph(event.target.value);
  }
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let currencies;
      if (currency === 'bitcoin')
        currencies = 'btc';
      else if (currency === 'tether')
        currencies = 'usd';
      else if(currency==='bitcoin,tether')
        currencies = 'btc,usd';
        
      if (currencies === 'btc,usd') {
        Promise.all([
          UsersService.getAllUsersPrice('btc', startDate, endDate),
          UsersService.getAllUsersPrice('usd', startDate, endDate)
        ]).then(([response1, response2]) => {
          const marketChart1 = response1.data.prices.map(([date, price]) => ({ date, price }));
          const marketChart2 = response2.data.prices.map(([date, price]) => ({ date, price }));
          const marketChart = marketChart1.concat(marketChart2);
          const labels = {};
          const chartData = {
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
                label: 'Prices',
                data: marketChart1.map((item) => item.price),
              },
              {
                label: 'Price',
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
    UsersService.getAllUsersPrice(currencies,startDate,endDate)
      .then((response) => {
        const marketChart = response.data.prices.map(([date, price]) => ({ date, price }));
        const chartData = {
          labels: marketChart.map((item) => {
            if(chartLabel=='1D'){
                return new Date(item.date).toLocaleDateString();
            }
            else if(chartLabel=='1W'){
                return new Date(item.date).toLocaleDateString(undefined,{month:'short',day:'numeric'})
            }
            
            else{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'short' });
            return `${month} ${year}`;}
          }),
          datasets: [
            {
              label: 'Prices',
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
    <button onClick={handleoneDayClick}>1D</button>
    <button onClick={handleoneWeekClick}>1W</button>
    <button onClick={handleoneMonthClick}>1M</button>
    <button onClick={handleoneYearClick}>1y</button>
    <select onChange={handleCurrencyChange}>
      <option>Crytocurrency</option>
      <option  value='bitcoin'>Bitcoin</option>
      <option  value='tether'>Tether</option>
      <option value='bitcoin,tether' >Bitcoin,Tether</option>
    </select>
    
    <select value={graph}  onChange={handleGraphChange}>
      <option value='BarChart'>BarChart</option>
      <option value='LineChart'>LineChart</option>
    </select>
{graph==='BarChart' && chartData && <BarChart chartData={chartData}key={`${startDate}-${endDate}`} />}
{graph==='LineChart' && chartData && <LineChart chartData={chartData}key={`${startDate}-${endDate}`} />}

  </div>
  );
}



export default MyComponent;

