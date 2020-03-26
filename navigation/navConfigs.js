import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

import MyIcon from '../components/MyIcon';
import TabIcon from '../components/TabIcon';
import Colors from '../constants/Colors';

export const stackNavigator = (screenName, screen, iconType) => {
  const iconNames = routeName => {
    switch (routeName) {
      case 'Absences Overview':
        return 'key';
      case 'Add New User':
        return 'user-plus';
      case 'Users I Monitor':
        return 'users';
      case 'My Absences':
        return 'open-book';
      case 'Add New Absence':
        return 'add-to-list';
      case 'Change Password':
        return 'key';
      default:
        return 'list';
    }
  };

  const iconName = iconNames(screenName);

  return createStackNavigator(
    {
      [screenName]: screen,
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig =>
          iconType === 'Feather' ? (
            <IconFeather
              name={Platform.OS === 'android' ? iconName : 'ios-book'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ) : (
            <IconEntypo
              name={Platform.OS === 'android' ? iconName : 'ios-book'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
      },
      defaultNavigationOptions: navData =>
        defaultNavOptions(navData, screenName),
    },
  );
};

export const defaultNavOptions = (navData, screenName) => {
  return {
    headerTitle: screenName,
    headerLeft: () => (
      <MyIcon
        androidIcon="menu"
        iosIcon="ios-menu"
        action={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleStyle: {
      fontWeight: '200',
    },
    cardStyle: {backgroundColor: Colors.sandish},
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  };
};

export const tabScreenConfig = screen => {
  return {
    Pending: {
      screen: screen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <TabIcon
              name={Platform.OS === 'android' ? 'stopwatch' : 'ios-clock'}
              size={23}
              activeColor={tabInfo}
              inactiveColor={tabInfo.inactiveTintColor}
              color={tabInfo.tintColor}
              badgeCount={5}
            />
          );
        },
      },
    },
    Approved: {
      screen: screen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <TabIcon
              name={Platform.OS === 'android' ? 'check' : 'ios-check'}
              size={23}
              color={tabInfo.tintColor}
              badgeCount={5}>
              {tabInfo}
            </TabIcon>
          );
        },
      },
    },
    Rejected: {
      screen: screen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <TabIcon
              name={Platform.OS === 'android' ? 'level-up' : 'ios-list'}
              size={23}
              color={tabInfo.tintColor}
              badgeCount={5}
            />
          );
        },
      },
    },
  };
};
