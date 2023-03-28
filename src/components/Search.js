
import React, { useEffect, useState } from 'react';
import { loadUsersAsync } from "../redux/reducers/users/users.thunks";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';


function Search() {
  const dispatch = useDispatch();
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
    <div>
       <select onChange={onChangeCurrency}>
        <option value="usd">usd</option>
        <option value="inr">inr</option>
      </select>
      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" onKeyPress={handleKeyPress} />
      </form>
      {showResults && !isLoading && users && (
        <div>
          {filteredUsers.length > 0
            ? filteredUsers.map((user) => (
              <h1 key={user.id}>
                {user.name}: {currencySymbol}
                
                  {user.market_cap.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                <h1><span
                  style={{
                    color: user.market_cap_change_percentage_24h < 0 ? "red" : "green",
                  }}
                >
                  {user.market_cap_change_percentage_24h && user.market_cap_change_percentage_24h<0? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}
                  {user.market_cap_change_percentage_24h}</span></h1>
              </h1>
              
            ))
            : sortedUsers &&
            sortedUsers.map((user) => (
              <p key={user.id}>
                {user.name}: {currencySymbol}
                {user.market_cap.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                {user.market_cap_change_percentage_24h && (
                  <span
                    style={{
                      color: user.market_cap_change_percentage_24h < 0 ? "red" : "green",
                    }}
                  >
                    {user.market_cap_change_percentage_24h && user.market_cap_change_percentage_24h<0? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}
                    {user.market_cap_change_percentage_24h.toFixed(2)}%
                  </span>
                )}
              </p>
            ))
          }
         
      

        </div>
      )}
      
    </div>
    
  );
}

export default Search;
