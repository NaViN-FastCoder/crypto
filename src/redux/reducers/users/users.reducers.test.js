// sample reducers.test.js file

import usersReducer from './users.reducer';
import usersInitialState from './users.initialState';



describe('usersReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      users: [],
      isLoading: false,
      errorMessage: null,
    };
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });
});


  it('should handle USERS_LOAD_START', () => {
    expect(
      usersReducer(undefined, {
        type: 'USERS_LOAD_START'
      })
    ).toEqual({
      users: [],
      isloading: true,
      errorMessage: null,
      exchangeRates:[],
      marketChart:[],
      markets:[],
    });
  });

  it('should handle USERS_LOAD_SUCCESS', () => {
    expect(
      usersReducer(undefined, {
        type: 'USERS_LOAD_SUCCESS',
        payload: [{ id: 'btc', name: 'Bitcoin' }]
      })
    ).toEqual({
      users: [{ id: 'btc', name: 'Bitcoin' }],
      loading: false,
      error: null
    });
  });

  it('should handle USERS_LOAD_ERROR', () => {
    expect(
      usersReducer(undefined, {
        type: 'USERS_LOAD_ERROR',
        payload: errorMessage
      })
    ).toEqual({
      users: [],
      loading: false,
      error: errorMessage,
    });
  });

it('should handle LOAD_MARKET_CHART_SUCCESS', () => {
    expect(
      usersReducer(undefined, {
        type: 'LOAD_MARKET_CHART_SUCCESS',
        payload: [{ timestamp: 1234567890, price: 1234.56 }]
      })
    ).toEqual({
      isLoading: false,
      users: [],
      errorMessage: "",
      markets: [],
      marketChart: [{ timestamp: 1234567890, price: 1234.56 }],
      exchangeRates: [],
    });
  });
  