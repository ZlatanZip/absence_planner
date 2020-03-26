import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import Colors from '../constants/Colors';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const StarupScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData'); // getItem rtrns promise
      if (!userData) {
        props.navigation.navigate('Auth'); //thanks to the switch navigator
        return;
      }

      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      /* if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      } */

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('AbsencesOverview');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch, navigation]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StarupScreen;
