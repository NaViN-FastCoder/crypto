import actionTypes from "./users.actionTypes";
import initialState from "./users.initialState";

const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.USERS_LOAD_START:
			return {
				...state,
				isLoading: true,
				users: null,
				errorMessage: null,
			};

		case actionTypes.USERS_LOAD_SUCCESS:
			return {
				...state,
				isLoading: false,
				users: payload,
			};

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
