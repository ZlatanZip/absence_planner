import {combineReducers} from 'redux';

import absencesReducer from './absences';
import authReducer from './auth';
import usersReducer from './users';

const rootReducer = combineReducers({
  absences: absencesReducer,
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
