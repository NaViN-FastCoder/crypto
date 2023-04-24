//importing essentials
import UsersService from "../../../services/users.service";
import actions from "./users.actions";
import usersActions from "./users.actions";


export const loadUsersAsync = (currencyChange) => (dispatch) => {
  dispatch(actions.usersLoadStart());

  //promise in which we call file usersservice for getting data from api and loading it into specific arrays
  Promise.all([UsersService.getAllUsers(currencyChange), UsersService.getAllUsersPrice("usd","1392577232","1422577232"),UsersService.getAllExchangeRates()])
    .then(([marketsResponse, marketChartResponse,marketExchangeResponse]) => {
      console.log(marketsResponse.data);
      console.log(marketChartResponse.data);
      console.log(marketExchangeResponse.data);
      dispatch((actions.usersLoadSuccess(marketsResponse.data)));
      dispatch(actions.loadmarketchartsuccess(marketChartResponse.data));
      
      })
    .catch((error) => dispatch(actions.usersLoadError(error.message)));
    
};
