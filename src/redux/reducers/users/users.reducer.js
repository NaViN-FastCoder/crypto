import actionTypes from "./users.actionTypes";
import initialState from "./users.initialState";

//creating reducers and initializing to the initial state for middlewares in redux store
const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		//if data from api is in process
		case actionTypes.USERS_LOAD_START:
			return {
				...state,
				isLoading: true,
				users: null,
				errorMessage: null,
			};
			//if data from api fetched successfully
		case actionTypes.USERS_LOAD_SUCCESS:
			return {
				...state,
				isLoading: false,
				users: payload,
			};
			//if data from api failed then handle the error
		case actionTypes.USERS_LOAD_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage: payload,
			};
			case actionTypes.LOAD_MARKET_CHART_SUCCESS:
				return {
				  ...state,
				  marketChart: payload,
				};
				case actionTypes.LOAD_MARKET_CHART_START:
					return {
						...state,
						isLoading: true,
						marketChart: null,
						errorMessage: null,
					 
					};
					case actionTypes.LOAD_MARKET_CHART_FAILURE:
				return {
					...state,
					isLoading: false,
					errorMessage: payload,
				 
				};
			case actionTypes.MARKET_CHART_EXCHANGE_SUCCESS:return{
				...state,
				marketExchange:payload,
			}
		
			
		default:
			return state;
	}
};

export default usersReducer;
