import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Feather';

import StartupScreen from '../screens/StarupScreen';
import AuthScreen from '../screens/AuthScreen';
import AllAbsencesScreen from '../screens/AllAbsencesScreen';
import AddNewAbsenceScreen from '../screens/AddNewAbsencesScreen';
import AddNewUserScreen from '../screens/AddNewUserScreen';
import UsersIAmResponsibleForScreen from '../screens/UsersIAmResponsibleForScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

import {stackNavigator, defaultNavOptions, tabScreenConfig} from './navConfigs';

import CustomToggleDrawer from '../components/CustomToggleDrawer';
import Colors from '../constants/Colors';

const AbsencesOverviewNavigator = stackNavigator(
  'Absences Overview',
  AllAbsencesScreen,
);
const MyAbsencesNavigator = stackNavigator(
  'My Absences',
  AllAbsencesScreen,
  'Entypo',
);
const AddNewUserNavigator = stackNavigator(
  'Add New User',
  AddNewUserScreen,
  'Feather',
);
const AddNewAbsenceNavigator = stackNavigator(
  'Add New Absence',
  AddNewAbsenceScreen,
  'Entypo',
);
const UsersNavigator = stackNavigator(
  'Users I Monitor',
  UsersIAmResponsibleForScreen,
  'Feather',
);
const ChangePasswordNavigator = stackNavigator(
  'Change Password',
  ChangePasswordScreen,
  'Feather',
);

const AbsencesTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        tabScreenConfig(AbsencesOverviewNavigator),
        {
          activeColor: Colors.accent_opacity,
          inactiveColor: Colors.whiteish_opacity_blur,
          // shifting: true,
          barStyle: {
            backgroundColor: Colors.plumish,
          },
          cardStyle: {backgroundColor: Colors.sandish},
        },
      )
    : createBottomTabNavigator(tabScreenConfig(AbsencesOverviewNavigator), {
        labelStyle: {
          fontWeight: '700',
        },
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const drawerItems = {
  'Absences Overview': {
    screen: AbsencesTabNavigator,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon
          name={Platform.OS === 'android' ? 'list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
  },
  'Add New User': AddNewUserNavigator,
  'Users I Monitor': UsersNavigator,
  'My Absences': MyAbsencesNavigator,
  'Add New Absence': AddNewAbsenceNavigator,
  'Change Password': ChangePasswordNavigator,
};

const AbsencesNavigator = createDrawerNavigator(drawerItems, {
  initialRouteName: 'My Absences',
  contentOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.whiteish_opacity,
    activeBackgroundColor: Colors.plumish_dark,
    labelStyle: {
      marginVertical: Dimensions.get('screen').height / 70,
      fontWeight: 'bold',
      fontSize: Dimensions.get('screen').height / 45,
    },
  },
  contentComponent: props => {
    return (
      <CustomToggleDrawer
        {...props}
        title="absence_planner"
        navigation={props.navigation}>
        <DrawerItems {...props} />
      </CustomToggleDrawer>
    );
  },
});

const MainNavigator = createSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthScreen,
    AbsencesOverview: AbsencesNavigator,
  },
  {
    defaultNavigationOptions: navData => defaultNavOptions(navData),
  },
);

export default createAppContainer(MainNavigator);
