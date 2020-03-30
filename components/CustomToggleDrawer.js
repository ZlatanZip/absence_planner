import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import IconEntypo from 'react-native-vector-icons/Entypo';

import * as authActions from '../store/actions/auth';

import ImageBackground from './ImageBackground';
import HeaderText from './HeaderText';
import RoundedButton from './RoundedButton';
import Colors from '../constants/Colors';
import CustomDrawerItem from '../components/CustomDrawerItem';
//import {DrawerItems} from 'react-navigation-drawer';

const EmployeeDrawerItems = props => {
  const {
    navigation,
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    activeItemKey,
  } = props;
  const drawerItems = props.items;
  let allLinks = [];
  let employeeLinks = [];
  for (const key in drawerItems) {
    allLinks.push({links: drawerItems[key].routeName});
  }
  employeeLinks = allLinks.slice(3, 6);

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.plumish,
      }}>
      <CustomDrawerItem
        navigation={navigation}
        activeItemKey={activeItemKey}
        link={employeeLinks[0].links}
        iconLibrary="Entypo"
        iconName="open-book"
        actionRoute="My Absences"
        activeItemBackgroundColor={activeBackgroundColor}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
      />
      <CustomDrawerItem
        navigation={navigation}
        activeItemKey={activeItemKey}
        link={employeeLinks[1].links}
        iconLibrary="Entypo"
        iconName="add-to-list"
        actionRoute="Add New Absence"
        activeItemBackgroundColor={activeBackgroundColor}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
      />
      <CustomDrawerItem
        navigation={navigation}
        activeItemKey={activeItemKey}
        link={employeeLinks[2].links}
        iconLibrary="Feather"
        iconName="key"
        actionRoute="Change Password"
        activeItemBackgroundColor={activeBackgroundColor}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
      />
    </View>
  );
};

const ToggleDrawer = props => {
  const dispatch = useDispatch();
  const {children, title, navigation} = props;
  const {role, firstName} = useSelector(state => state.users.userInfo);

  return (
    <View style={styles.toggleScreen}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <ImageBackground
          style={styles.imageBackground}
          image={require('../assets/photos/absenceplannerfront.png')}
          navigation={navigation}>
          {firstName}
        </ImageBackground>
        <View style={styles.listTitleContanier}>
          <HeaderText style={styles.listTitle}>{title}</HeaderText>
        </View>
        <View style={styles.listContainer}>
          {role === 'Admin' ? children : <EmployeeDrawerItems {...props} />}
        </View>

        <RoundedButton
          style={styles.bottomButton}
          color={Colors.primary}
          title="Logout"
          onPress={() => {
            dispatch(authActions.logout());
            props.navigation.navigate('Auth');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleScreen: {
    flex: 1,
    backgroundColor: Colors.plumish,
  },
  imageBackground: {
    width: '100%',
    height: Dimensions.get('screen').height / 3.5,
  },
  listTitleContanier: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 8,
  },
  listTitle: {
    fontWeight: 'bold',
    color: Colors.whiteish_opacity,
    marginLeft: 0,
  },
  listContainer: {
    alignItems: 'center',
    height: Dimensions.get('screen').height / 3,
    marginHorizontal: Dimensions.get('screen').width / 20,
  },
  bottomButton: {
    marginHorizontal: Dimensions.get('screen').width / 15,
    marginVertical: Dimensions.get('screen').height / 15,
  },
});

export default ToggleDrawer;
