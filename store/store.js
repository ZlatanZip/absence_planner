import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
//import {composeWithDevTools} from 'redux-devtools-extension';
//http://localhost:19001/debugger-ui/

import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk) /* composeWithDevTools() */,
);

export default store;
