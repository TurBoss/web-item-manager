import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../actions/userAction';

// TODO check localStorage if token exists and if it has expired
const defaultState = {
  isFetching: false,
  isAuthenticated: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.user
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        error: ''
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: action.message
      });
    default:
      return state;
  }
};
