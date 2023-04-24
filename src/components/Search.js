
import React, { useEffect, useState } from 'react';
import { loadUsersAsync } from "../redux/reducers/users/users.thunks";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineUp  } from 'react-icons/ai';



function Search() {
  const dispatch = useDispatch();
  //hooks
  const { isLoading, users, errorMessage } = useSelector((state) => state.users);
  const [currencyChange, setCurrencyChange] = useState('usd');
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const[currencySymbol,setCurrencySymbol]=useState('$');
  useEffect(() => {
    dispatch(loadUsersAsync(currencyChange));
  }, [currencyChange,currencySymbol]);

  const sortedUsers = users && users.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setShowResults(true);
  };
//event handling as if user types and hit enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchText = event.target.value?.toLowerCase() || '';
      const filteredData = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchText)
      );
      setFilteredUsers(filteredData);
      setSearch(event.target.value);
      setShowResults(true);
    }
  };
  //checking if currency amount should be in $ or  inr
  const onChangeCurrency = (event) => {
    const newCurrency=event.target.value;
    setCurrencyChange(newCurrency);
    if(newCurrency==='usd'){
      setCurrencySymbol('$');}
      else{
      setCurrencySymbol('Rs');}
  };


  useEffect(() => {
    setShowResults(true); // Setting the showResults state to true on mount
  }, []);

  return (
    <div >
      <div className="">
      <select className="absolute top-1.5 left-0 mt-3 ml-2 bg-gray-200 text-black rounded-md px-5 py-2 w-30 h-9 border border-black" style={{ padding: '0.5rem 2rem 0.5rem 0.5rem', color: 'black !important' }}  onChange={onChangeCurrency}>
        <option value="usd">usd</option>
        <option value="inr">inr</option>
      </select>
      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
  
      <div class="absolute top-0 left-20 p-5 ">
      <form onSubmit={handleSearch}>
        <input type="text" className="bg-gray-200 text-black rounded-md  px-4 w-96 border border-black h-9" placeholder="Search" onKeyPress={handleKeyPress} />
      </form></div>
      </div>
      <div>
        <label className="font-medium  mt-5">Cryptocurrencies by Market Cap</label>
      {/** displaying cryptocurrencies by market cap */}
      {showResults && !isLoading && users && (
        <div className=" w-full ">
          {/** if user searches the data then display searched result or display all cryptocurrencies */}
          {filteredUsers.length > 0
            ? filteredUsers.map((user) => (
            <div className="flex">  <h1 className="font-medium ml-5   " key={user.id}>
                {user.name}: {currencySymbol}
                {/** displaying in a proper format */}
                  {user.market_cap.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                <h1 className="font-medium " ><span className="ml-25 w-full pd-5"
                  style={{
                    color: user.market_cap_change_percentage_24h < 0 ? "red" : "green",
                  }}
                >
                  {user.market_cap_change_percentage_24h && user.market_cap_change_percentage_24h<0? <AiOutlineDown className="pd-5"/>:<AiOutlineUp className="pd-5" />}
                 <h2> {user.market_cap_change_percentage_24h}</h2></span></h1>
              </div>
              
            ))
            
            : sortedUsers &&
            sortedUsers.map((user) => (
              <div className="font-medium ml-5 mt-2 "   key={user.id}>
                {user.name} <br /> <div className="flex"><h1  className="  text-base inline-block  ">mkt cap:{currencySymbol}
                {user.market_cap.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
</h1><p>
                {user.market_cap_change_percentage_24h && (
                  <span className=" inline-flex  items-center ml-auto w-full"
                    style={{
                      color: user.market_cap_change_percentage_24h < 0 ? "red" : "green",
                    }}
                  >
                    {user.market_cap_change_percentage_24h && user.market_cap_change_percentage_24h<0?  <AiOutlineDown  className="ml-2 mt-[-15]"/>:<AiOutlineUp  className="inline-block ml-auto mt-15"/>}
                   <h1 className="  inline-block w-16 mt-[-25]  "> {user.market_cap_change_percentage_24h.toFixed(2)}%</h1>
                  </span>
                )}</p></div>
              </div>
            ))
          }
         
      

        </div>
        
      )}</div>
      
    </div>
    
  );
}

export default Search;
