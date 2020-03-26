import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const myIcon = props => {
  const {androidIcon, iosIcon, action, style, title} = props;
  return (
    <View style={styles.iconWrapper}>
      {title && <Text style={{...style}}>{title}</Text>}
      <Icon
        style={{...styles.icon, ...style}}
        name={Platform.OS === 'android' ? androidIcon : iosIcon}
        size={23}
        onPress={action}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    margin: 15,
    color: 'white',
  },
});

export default myIcon;
