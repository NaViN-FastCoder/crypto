

import apiClient from "../helpers/apiClient";

class UsersService {
  getAllUsers = (vs_currency) =>
    apiClient().get(
      `/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h&market_cap=true`,
     
    );
    

    getAllUsersPrice = (coin,startDate,endDate) =>
    apiClient().get(`/coins/${coin}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`
    );

    getAllExchangeRates=()=>apiClient().get(`/exchange_rates`);
   getSearchName=(coin)=>apiClient().get(`/search?query=${coin}`);
}

export default new UsersService();


