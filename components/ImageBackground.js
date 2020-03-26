import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import Colors from '../constants/Colors';

const ImageContainer = props => {
  return (
    <ImageBackground
      style={{...styles.background, ...props.style}}
      source={props.image}>
      <View style={styles.buttonContainer}>
        <Icon.Button
          size={40}
          color={Colors.accent}
          name="chevron-left"
          backgroundColor="transparent"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello {props.children}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: Dimensions.get('screen').width / 17,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
});

export default ImageContainer;
