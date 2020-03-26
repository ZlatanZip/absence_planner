import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';

const CustomDrawerItem = props => {
  const {
    navigation,
    activeItemKey,
    link,
    iconLibrary,
    iconName,
    actionRoute,
    activeItemBackgroundColor,
    activeTintColor,
    inactiveTintColor,
  } = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.drawerItemsWrapper,
        backgroundColor:
          link === activeItemKey ? activeItemBackgroundColor : null,
      }}
      onPress={() => navigation.navigate(actionRoute)}>
      {iconLibrary === 'Entypo' ? (
        <IconEntypo
          name={Platform.OS === 'android' ? iconName : 'ios-key'}
          size={23}
          color={link === activeItemKey ? activeTintColor : inactiveTintColor}
        />
      ) : (
        <Icon
          name={Platform.OS === 'android' ? iconName : 'ios-key'}
          size={23}
          color={link === activeItemKey ? activeTintColor : inactiveTintColor}
        />
      )}

      <Text
        style={{
          ...styles.drawerItemsText,
          color: link === activeItemKey ? activeTintColor : inactiveTintColor,
        }}>
        {link}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerItemsWrapper: {
    paddingVertical: Dimensions.get('screen').width / 25,
    paddingHorizontal: Dimensions.get('screen').width / 25,
    minWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  drawerItemsText: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('screen').height / 50,
    color: Colors.whiteish_opacity,
    paddingHorizontal: Dimensions.get('screen').width / 20,
  },
});

export default CustomDrawerItem;
