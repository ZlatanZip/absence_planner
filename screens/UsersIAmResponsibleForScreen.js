import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import MyIcon from '../components/MyIcon';
import UserItem from '../components/UserItem';
import RoundedButton from '../components/RoundedButton';
import * as userActions from '../store/actions/users';
import Colors from '../constants/Colors';

const UserIMonitorScreen = props => {
  const {navigation} = props;
  //const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const FlatListRef = useRef();
  const users = useSelector(state => state.users.users);
  const token = useSelector(state => state.auth.token);
  /*   const token = useSelector(state => state.auth.token);  
  // console.log(token);
  const userId = useSelector(state => state.auth.userId); */

  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(userActions.fetchUsers());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    setIsLoading(false);
  }, [dispatch, setError]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      loadUsers,
    );
    return () => {
      willFocusSubscription.remove();
    };
  }, [loadUsers, navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadUsers().then(() => {
      setIsLoading(false);
      //setMessage(navigation.getParam('message'));
    });
  }, [dispatch, navigation, loadUsers]);

  const selectUserHandler = id => {
    props.navigation.navigate('UserDetails', {
      productId: id,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button title="Try Again" onPress={loadUsers} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <View style={styles.centered}>
        <Text> No users found.Try adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <FlatList
        //ListHeaderComponent={<Text>{message}</Text>}
        onRefresh={loadUsers}
        refreshing={isRefreshing}
        data={users}
        keyExtractor={item => item.id}
        ref={FlatListRef}
        renderItem={itemData => (
          <UserItem
            firstName={itemData.item.firstName}
            lastName={itemData.item.lastName}
            role={itemData.item.role}
            email={itemData.item.email}
            transferFromPreviousYear={itemData.item.transferFromPreviousYear}
            remainingDays={itemData.item.remainingDaysAvaliable}
            reviewers={itemData.item.reviewersList}
            editUser={() => {
              selectUserHandler(itemData.item.id);
            }}>
            {/* <RoundedButton
              style={styles.actions}
              title="Approve"
              onPress={() => {
                props.navigation.navigate('AbsenceDetails');
              }}
            />
            <RoundedButton
              color={Colors.grayish}
              style={styles.actions}
              title="Invalidate"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
            <RoundedButton
              color={Colors.redish}
              style={styles.actions}
              title="Reject"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            /> */}
          </UserItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    paddingHorizontal: 0,
    padding: 0,
    backgroundColor: Colors.grayish,
  },
});

UserIMonitorScreen.navigationOptions = navData => {
  const title = navData.navigation.state.routeName;
  return {
    headerTitle: title,
    headerLeft: () => (
      <MyIcon
        androidIcon="menu"
        iosIcon="ios-menu"
        action={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <MyIcon
        androidIcon="plus"
        iosIcon="ios-plus"
        action={() => {
          navData.navigation.navigate('Add New User');
        }}
      />
    ),
  };
};

export default UserIMonitorScreen;
