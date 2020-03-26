import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../constants/Colors';

const ResponsiveText = props => {
  const {style, children} = props;
  return (
    <Text {...props} style={{...styles.text, ...style}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: Dimensions.get('screen').width / 24,
    color: Colors.whiteish_opacity,
  },
});

export default ResponsiveText;
