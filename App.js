import React from 'react';
import {Provider} from 'react-redux';

import store from './store/store';
import NavigationContanier from './navigation/NavigationContainer';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContanier />
    </Provider>
  );
}
