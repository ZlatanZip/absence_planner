import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../constants/Colors';

const HeaderText = props => {
  const {style, children} = props;
  return <Text style={{...styles.text, ...style}}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: Dimensions.get('screen').width / 17,
    color: Colors.whiteish_opacity,
    fontWeight: 'normal',
    marginLeft: Dimensions.get('screen').width / 17,
  },
});

export default HeaderText;
