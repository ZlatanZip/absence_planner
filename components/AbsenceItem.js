import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../constants/Colors';
import Card from './Card';
import ResponsiveText from './ResponsiveText';
import RoundedButton from './RoundedButton';

const AbsenceItem = props => {
  const {
    firstName,
    lastName,
    status,
    startDate,
    endDate,
    returnDate,
    type,
    description,
    onSelect,
  } = props;
  const [showDetails, setShowDetails] = useState(false);
  const titleStyle = firstName ? styles.absenceType : styles.absenceTypeBig;
  return (
    <Card style={styles.absenceItem}>
      <View style={styles.header}>
        {firstName && (
          <ResponsiveText style={styles.user}>
            {firstName + ' ' + lastName}
          </ResponsiveText>
        )}
        <ResponsiveText style={titleStyle}>{type}</ResponsiveText>
      </View>

      {showDetails && (
        <View style={styles.details}>
          <View style={styles.dateContainer}>
            <ResponsiveText>Start Date</ResponsiveText>
            <ResponsiveText style={styles.label}>{startDate}</ResponsiveText>
          </View>
          <View style={styles.dateContainer}>
            <ResponsiveText>End Date</ResponsiveText>
            <ResponsiveText style={styles.label}>{endDate}</ResponsiveText>
          </View>
          <View style={styles.dateContainer}>
            <ResponsiveText>Status</ResponsiveText>
            <ResponsiveText style={styles.label}>{status}</ResponsiveText>
          </View>
          {description && (
            <View style={styles.descriptionContainer}>
              <ResponsiveText>Description:</ResponsiveText>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}
          <View style={styles.actions}>{props.children}</View>
        </View>
      )}

      <RoundedButton
        color={!showDetails ? Colors.primary : Colors.accent}
        style={styles.button}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}>
        Show Details
      </RoundedButton>
    </Card>
  );
};

const styles = StyleSheet.create({
  absenceItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '95%',
    marginVertical: Dimensions.get('screen').width / 50,
    backgroundColor: Colors.plumish,
    paddingVertical: Dimensions.get('screen').height / 40,
    paddingHorizontal: Dimensions.get('screen').width / 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: Colors.whiteish_opacity,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: Dimensions.get('screen').height / 30,
  },
  description: {
    color: 'white',
  },
  actions: {
    marginTop: Dimensions.get('screen').height / 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  user: {
    fontWeight: 'bold',
    color: Colors.sandish,
  },
  absenceType: {
    color: Colors.accent,
  },
  absenceTypeBig: {
    color: Colors.accent,
    fontSize: Dimensions.get('screen').width / 18,
  },
  details: {
    width: '80%',
    justifyContent: 'space-between',
    marginHorizontal: Dimensions.get('screen').width / 10,
    marginVertical: Dimensions.get('screen').height / 35,
  },
  button: {
    marginTop: Dimensions.get('screen').height / 35,
    width: '80%',
  },
});

export default AbsenceItem;
