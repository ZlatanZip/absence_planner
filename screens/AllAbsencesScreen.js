import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import AbsenceItem from '../components/AbsenceItem';
import RoundedButton from '../components/RoundedButton';
import * as absencesActions from '../store/actions/absences';
import Colors from '../constants/Colors';

const AllAbsencesScreen = props => {
  const {navigation, key} = props;
  const path = navigation.state.routeName;

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const FlatListRef = useRef();
  const absences = useSelector(state => state.absences.allAbsences);
  const {role, _id} = useSelector(state => state.users.userInfo);

  const dispatch = useDispatch();

  const loadAbsences = useCallback(async () => {
    let action;
    if (path === 'Absences Overview' && role === 'Admin') {
      action = absencesActions.fetchAllAbsences();
    } else {
      action = absencesActions.fetchMyAbsences();
    }
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    setIsLoading(false);
  }, [dispatch, role, path, setError]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      loadAbsences,
    );
    return () => {
      willFocusSubscription.remove();
    };
  }, [loadAbsences, navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadAbsences().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAbsences]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('AbsenceDetails', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try Again"
          onPress={loadAbsences}
          color={Colors.primary}
        />
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

  if (!isLoading && absences.length === 0) {
    return (
      <View style={styles.centered}>
        <Text> No absences found.Try adding some!</Text>
      </View>
    );
  }

  /*  const showingAbsenceItemsDependingOnRoleAndPath = () => {};*/
  //console.log(props);
  return (
    <View style={styles.centered}>
      <FlatList
        onRefresh={loadAbsences}
        refreshing={isRefreshing}
        data={absences}
        keyExtractor={item => item.id}
        ref={FlatListRef}
        renderItem={itemData =>
          // Displays absence items depending on screen.On the Absences Overview screen other users absences are visible,
          // on the other side My Absences screen displays actual user absences.
          // Buttons are as well displayed depending on who is the owner of the absence and role of user
          path === 'Absences Overview' &&
          itemData.item.Status === props.navigation.state.routeName ? null : (
            <AbsenceItem
              firstName={itemData.item.firstName}
              lastName={itemData.item.lastName}
              status={itemData.item.status}
              startDate={itemData.item.startDate}
              endDate={itemData.item.endDate}
              returnDate={itemData.item.returnDate}
              type={itemData.item.type}
              description={
                itemData.item.description ? itemData.item.description : null
              }
              onSelect={() => {
                //selectItemHandler(itemData.item.id, itemData.item.title);
              }}>
              {role === 'Admin' && (
                <View style={styles.buttonWrapper}>
                  <RoundedButton
                    style={styles.actions}
                    title="Approve"
                    onPress={() => {
                      //  props.navigation.navigate('AbsenceDetails');
                    }}
                  />
                  <RoundedButton
                    color={Colors.redish}
                    style={styles.actions}
                    title="Reject"
                    onPress={() => {
                      // dispatch(cartActions.addToCart(itemData.item));
                    }}
                  />
                </View>
              )}
              {/* Only the owner of the absence can edit the absence itself */}
              {itemData.item.ownerId === _id && (
                <RoundedButton
                  color={Colors.grayish}
                  style={styles.actions}
                  title="Edit"
                  onPress={() => {
                    console.log(itemData.item);
                  }}
                />
              )}
            </AbsenceItem>
          )
        }
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
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default AllAbsencesScreen;
