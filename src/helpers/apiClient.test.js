import fetchMock from 'jest-fetch-mock';
import apiClient from '../path/to/apiClient';

describe('CoinGecko API', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return a list of coins', async () => {
    const coins = [      {        id: 'bitcoin',        symbol: 'btc',        name: 'Bitcoin',      },      {        id: 'ethereum',        symbol: 'eth',        name: 'Ethereum',      },    ];

    fetchMock.mockResponseOnce(JSON.stringify(coins));

    const response = await apiClient().get('/coins/list');

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(coins);
  });

  it('should return coin details for a specific coin', async () => {
    const coinId = 'bitcoin';
    const coinDetails = {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      market_data: {
        current_price: {
          usd: 60000,
        },
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(coinDetails));

    const response = await apiClient().get(`/coins/${coinId}`);

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(coinDetails);
  });
});
