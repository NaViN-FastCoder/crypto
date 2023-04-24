//importing essentials
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import UsersService from '../services/users.service';
function Exchange() {
 
const [convertedAmount, setConvertedAmount] = useState(0);
const [exchangeData,setExchangeData]=useState(null);
const[inputData,setInputData]=useState('bch');
const[targetData,setTargetData]=useState('eth');
const[amount,setAmount]=useState(0);
const[textboxValue,setTextboxValue]=useState(0);
const[errorMessage,setErrorMessage]=useState('')
useEffect(() => {
  const delayDebounceFn=setTimeout(()=>{
  UsersService.getAllExchangeRates()//calling coingecko api from users file
    .then((response) => {
      setExchangeData(response.data);});},500);return()=> clearTimeout(delayDebounceFn)},[]);
      const bch = exchangeData?.rates?.bch?.value;//getting values from the response of api
      const euro=exchangeData?.rates?.eur?.value;
      const ether=exchangeData?.rates?.eth?.value;

  console.log(euro);
  console.log(bch);
  console.log(ether);
  const handleInputdatachange=(event)=>{
    setInputData(event.target.value);
  }
  const handleTagetdatachange=(event)=>{
    setTargetData(event.target.value);
  }
  const handleAmountChange=(event)=>{
    setAmount(event.target.value);
  }
  const TextBoxValueChange=(event)=>{
    setTextboxValue(event.target.value);
    setErrorMessage('');
    const regex=/^[0-9]*$/;//regex code to validate whether input field is a number only
    if(!regex.test(textboxValue)){//testing regex
      setErrorMessage('Enter only numbers');
    }
  }
  const calculateExchange=()=>{
    if(errorMessage){return;}
    const inputAmount = parseFloat(textboxValue);
    console.log('inputData:', inputData);
    console.log('exchangeData:', exchangeData);
    const fromRate=exchangeData?.rates?.[inputData]?.value;
    const targetRate=exchangeData?.rates?.[targetData]?.value;
    console.log('Fromrate:',fromRate);
    console.log('TargetRate',targetRate);
    //exchange logic
    const ExchangeRate=targetRate/fromRate;
    const convertedAmount=+(inputAmount*ExchangeRate).toFixed(2);
    setConvertedAmount({amount:convertedAmount,currency:targetData.toUpperCase()});
  }
  
  return (
    <div>
      
    <div className="text-10xl mt-3 font-bold flex justify-left">Exchange Coins</div>
    
    <div className="flex pd-10 ml-4 mt-4 " > 
    <label className="font-medium mr-5 ">Sell</label>
      <select className="bg-gray-200 mr-4 text-black rounded-md w-30 h-full pd-5='true' pr-8 border border-black flex  justify-center" id='inputcurrency' value={inputData} onChange={handleInputdatachange}>
      <option id='bch' style={{ width: '150px', marginRight: '10px' }}value='bch'>Bitcoin</option>
      <option id='ether' style={{ width: '150px', marginRight: '10px' }} value='eth'>ETher</option>
      <option id='euro' style={{ width: '150px', marginRight: '10px' }}value='eur'> Euro</option></select>
      
      <input type='text' placeholder="Enter value" className=" bg-gray-200 text-black rounded-md w-10 h-full pd-5='true'  border border-black flex  justify-center"  value={textboxValue} onChange={TextBoxValueChange}></input>
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
    </div>

    <div className= "flex pd-10  mt-4 ml-4 "> 
    <label className=" font-medium mr-5  ">Buy</label>
      <select className=" pr-7 bg-gray-200 text-black rounded-md w-30 h-full  border border-black flex  " id='targetcurrency' value={targetData} onChange={handleTagetdatachange}>
      <option id='bch' style={{ width: '150px', marginRight: '10px' }}value='bch'>Bitcoin</option>
      <option id='ether' style={{ width: '150px', marginRight: '10px' }} value='eth'>ETher</option>
      <option id='euro' style={{ width: '150px', marginRight: '10px' }}value='eur'> Euro</option></select>
      <label className="pr-4 pl-4 font-medium" >{convertedAmount.amount} {convertedAmount.currency}</label> 
      </div>
      <div className= "flex justify-center">
      <button className="mt-4 pr-4 bg-blue-700 text-black border border-black rounded-md w-35 h-full  " onClick={calculateExchange}>Exchange</button>
    </div>
   
    </div>
    
  )
}

export default Exchange