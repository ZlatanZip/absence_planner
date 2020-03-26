import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import AbsencePlannerNavigator from './AbsencePlannerNavigator';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);
  const role = useSelector(state => state.users.userInfo.role);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [isAuth]);
  return <AbsencePlannerNavigator role={role} ref={navRef} />;
};

export default NavigationContainer;
