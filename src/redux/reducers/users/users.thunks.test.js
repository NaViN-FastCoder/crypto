const { loadUsersAsync } = require('./users.thunks');
const actions = require('./users.actions');
const UsersService = require('../../../services/users.service');

jest.mock('../../../services/users.service');

describe('loadUsersAsync', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('should dispatch usersLoadStart', () => {
    loadUsersAsync()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(actions.usersLoadStart());
  });
});
