import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';

const TabIcon = ({name, badgeCount, color, activeColor, size, children}) => {
  return (
    <View style={styles.badgeWrapper}>
      <IconEntypo
        name={Platform.OS === 'android' ? name : 'ios-clock'}
        size={size}
        color={color}
      />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeWrapper: {width: 24, height: 24, margin: 5},
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: Colors.redish,
    borderRadius: 6,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {color: 'white', fontSize: 10, fontWeight: 'bold'},
});

export default TabIcon;
