import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import ResponsiveText from './ResponsiveText';
import Colors from '../constants/Colors';

const RoundedButton = props => {
  const {onPress, style, title, color} = props;
  const activeColor = color ? color : Colors.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.button, ...style, backgroundColor: activeColor}}>
      <ResponsiveText style={styles.actionText}>{title}</ResponsiveText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 80,
    paddingHorizontal: 20,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  actionText: {
    paddingHorizontal: 3,
    paddingVertical: Dimensions.get('screen').width / 70,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RoundedButton;
