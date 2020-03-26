import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Colors from '../constants/Colors';
import Card from './Card';
import ResponsiveText from './ResponsiveText';
import RoundedButton from './RoundedButton';
import Input from '../components/Input';

const UserItem = props => {
  const {
    firstName,
    lastName,
    role,
    email,
    reviewers,
    transferFromPreviousYear,
    remainingDays,
    updateAction,
  } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  return (
    <Card style={styles.absenceItem}>
      <View style={styles.header}>
        <ResponsiveText style={styles.user}>
          {firstName + ' ' + lastName}
        </ResponsiveText>
        <ResponsiveText style={styles.absence}>{role}</ResponsiveText>
      </View>

      {showDetails && (
        <View style={styles.details}>
          <View style={styles.dateContainer}>
            <ResponsiveText>Remaining Days :</ResponsiveText>
            {isEditable ? (
              <Input
                id="imageUrl"
                placeholder="Enter number of days"
                placeholderTextColor={Colors.whiteish_opacity}
                errorText="Please enter a valid number of days!"
                keyboardType="numeric"
                returnKeyType="next"
                value={remainingDays}
              />
            ) : (
              <ResponsiveText
                accessible={isEditable ? true : false}
                style={styles.label}>
                {remainingDays}
              </ResponsiveText>
            )}
          </View>

          <View style={styles.dateContainer}>
            <ResponsiveText numberOfLines={2}>
              Transfer of days :
            </ResponsiveText>
            {isEditable ? (
              <Input
                id="imageUrl"
                placeholder="Enter number of days"
                placeholderTextColor={Colors.whiteish_opacity}
                errorText="Please enter a valid image url!"
                keyboardType="numeric"
                returnKeyType="next"
                value={remainingDays}
              />
            ) : (
              <ResponsiveText
                accessible={isEditable ? true : false}
                style={styles.label}>
                {transferFromPreviousYear}
              </ResponsiveText>
            )}
          </View>
          <View style={styles.dateContainer}>
            <ResponsiveText>E-mail :</ResponsiveText>
            {isEditable ? (
              <Input
                id="email"
                placeholder="Enter a valid email"
                placeholderTextColor={Colors.whiteish_opacity}
                errorText="Please enter a valid email!"
                keyboardType="default"
                returnKeyType="next"
                value={remainingDays}
              />
            ) : (
              <ResponsiveText
                accessible={isEditable ? true : false}
                style={styles.label}>
                {email}
              </ResponsiveText>
            )}
          </View>

          <View style={styles.actions}>{props.children}</View>

          <RoundedButton
            color={isEditable ? Colors.redish : Colors.grayish}
            style={{...styles.actions, ...styles.editButton}}
            title={isEditable ? 'Exit User Details' : 'Edit User Details'}
            onPress={() => setIsEditable(prevState => !prevState)}
          />
        </View>
      )}
      <RoundedButton
        color={
          isEditable
            ? Colors.grayish
            : !showDetails
            ? Colors.primary
            : Colors.accent
        }
        style={styles.button}
        title={
          isEditable
            ? 'Update User'
            : showDetails
            ? 'Hide Details'
            : 'Show Details'
        }
        onPress={() => {
          isEditable ? updateAction : setShowDetails(prevState => !prevState);
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
    paddingVertical: Dimensions.get('screen').height / 30,
    paddingHorizontal: Dimensions.get('screen').width / 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: Dimensions.get('screen').height / 35,
  },
  label: {
    color: Colors.whiteish_opacity,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Dimensions.get('screen').height / 100,
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
  absence: {
    color: Colors.accent,
  },
  details: {
    width: '80%',
    justifyContent: 'space-between',
    marginHorizontal: Dimensions.get('screen').width / 10,
    marginVertical: Dimensions.get('screen').height / 35,
  },
  button: {
    width: '80%',
  },
});

export default UserItem;
