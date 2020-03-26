import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
/* import {composeWithDevTools} from 'redux-devtools-extension' */
//http://localhost:19001/debugger-ui/
import absencesReducer from './store/reducers/absences';
import authReducer from './store/reducers/auth';
import NavigationContanier from './navigation/NavigationContainer';
import usersReducer from './store/reducers/users';

const rootReducer = combineReducers({
  absences: absencesReducer,
  users: usersReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk) /* composeWithDevTools() */,
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContanier />
    </Provider>
  );
}
