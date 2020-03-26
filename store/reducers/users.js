import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_USERS,
  SET_ADMINS,
  SET_LOGGED_IN_USER_INFO,
} from '../actions/users';

const initialState = {
  users: [],
  admins: [],
  userInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_ADMINS:
      return {...state, admins: action.admins};
    case SET_LOGGED_IN_USER_INFO:
      return {...state, userInfo: action.userInfo};
  }

  return state;
};
