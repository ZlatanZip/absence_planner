import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const FlatlistHeaderMessage = props => {
  const {message} = props;
  return (
    <View style={styles.contanier}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.redish,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {color: Colors.whiteish_opacity, fontWeight: 'bold'},
});

export default FlatlistHeaderMessage;
