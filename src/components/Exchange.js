
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
  UsersService.getAllExchangeRates()
    .then((response) => {
      setExchangeData(response.data);});},500);return()=> clearTimeout(delayDebounceFn)},[]);
      const bch = exchangeData?.rates?.bch?.value;
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
    const regex=/^[0-9]*$/;
    if(!regex.test(textboxValue)){
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
    const ExchangeRate=targetRate/fromRate;
    const convertedAmount=+(inputAmount*ExchangeRate).toFixed(2);
    setConvertedAmount({amount:convertedAmount,currency:targetData.toUpperCase()});
  }
  
  return (
    <div>
    <div>Exchange Coins</div>
    <div > 
      <select id='inputcurrency' value={inputData} onChange={handleInputdatachange}>
      <option id='bch' style={{ width: '150px', marginRight: '10px' }}value='bch'>Bitcoin</option>
      <option id='ether' style={{ width: '150px', marginRight: '10px' }} value='eth'>ETher</option>
      <option id='euro' style={{ width: '150px', marginRight: '10px' }}value='eur'> Euro</option></select>
      
      <input type='text' placeholder='avail:' value={textboxValue} onChange={TextBoxValueChange}></input>
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
    </div>
    <div > 
      <select id='targetcurrency' value={targetData} onChange={handleTagetdatachange}>
      <option id='bch' style={{ width: '150px', marginRight: '10px' }}value='bch'>Bitcoin</option>
      <option id='ether' style={{ width: '150px', marginRight: '10px' }} value='eth'>ETher</option>
      <option id='euro' style={{ width: '150px', marginRight: '10px' }}value='eur'> Euro</option></select>
      <label>{convertedAmount.amount} {convertedAmount.currency}</label> 
      <button onClick={calculateExchange}>Exchange</button>
    </div>
    </div>
    
  )
}

export default Exchange