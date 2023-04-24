

import apiClient from "../helpers/apiClient";

class UsersService {
  getAllUsers = (vs_currency) =>
  //calling apiclient file to call  apis with marketcap data
    apiClient().get(
      `/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=200&page=10&sparkline=false&price_change_percentage=24h&market_cap=true`,
     
    );
    
 //calling apiclient file to call  apis with  data for displaying onto charts
    getAllUsersPrice = (coin,startDate,endDate) =>
    apiClient().get(`/coins/${coin}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`
    );
 //calling apiclient file to call  apis with exchanges data
    getAllExchangeRates=()=>apiClient().get(`/exchange_rates`);
   getSearchName=(coin)=>apiClient().get(`/search?query=${coin}`);
}

export default new UsersService();


