//importing actiontypes 
import actionTypes from "./users.actionTypes";
//actions for redux store
const usersLoadStart = () => ({
	type: actionTypes.USERS_LOAD_START,
});

const usersLoadSuccess = (users) => ({
	type: actionTypes.USERS_LOAD_SUCCESS,
	payload: users,
});

const usersLoadError = (errorMessage) => ({
	type: actionTypes.USERS_LOAD_ERROR,
	payload: errorMessage,
});

const loadmarketchartsuccess = (marketChart) => ({
	type: actionTypes.LOAD_MARKET_CHART_SUCCESS,
	payload: marketChart,});
const loadmarketchartfailure = (errorMessage) => ({
	type: actionTypes.LOAD_MARKET_CHART_FAILURE,
	payload: errorMessage});
const loadmarketchartstart = () => ({
	type: actionTypes.LOAD_MARKET_CHART_START})
const marketChartExchangeLoadSuccess=(marketExchange)=>({
	type:actionTypes.MARKET_CHART_EXCHANGE_SUCCESS,
	payload:marketExchange,
})



export default {
	usersLoadStart,
	usersLoadSuccess,
	usersLoadError,
	loadmarketchartfailure,
	loadmarketchartstart,
	loadmarketchartsuccess,	
	 marketChartExchangeLoadSuccess,
	 
};
