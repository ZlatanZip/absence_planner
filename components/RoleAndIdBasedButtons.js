import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ADMIN_PERMISSION} from 'react-native-dotenv';

import RoundedButton from './RoundedButton';
import Colors from '../constants/Colors';

const RoleAndIdBasedButtons = props => {
  const {
    path,
    role,
    status,
    userId,
    ownerId,
    absenceId,
    submitHandler,
    reason,
  } = props;
  return (
    <View style={styles.buttonWrapper}>
      {role === ADMIN_PERMISSION && status === 'Pending' ? (
        <View style={styles.buttonWrapper}>
          <RoundedButton
            style={styles.actions}
            title="Approved"
            onPress={() => {
              submitHandler(absenceId, 'Approved', reason);
            }}
          />
          {path === 'Absences Overview' && (
            <RoundedButton
              color={Colors.grayish}
              style={styles.actions}
              title="Reject"
              onPress={() => {
                submitHandler(absenceId, 'Rejected', reason);
              }}
            />
          )}
        </View>
      ) : null}
      {role === ADMIN_PERMISSION && (
        <RoundedButton
          color={Colors.redish}
          style={styles.actions}
          title={status !== 'Invalidated' ? 'Invalid' : 'Delete'}
          onPress={() => {
            submitHandler(absenceId);
          }}
        />
      )}
      {ownerId !== userId ? null : (
        <RoundedButton
          color={Colors.grayish}
          style={styles.actions}
          title="Edit"
          onPress={() => {
            console.log('heloo');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    paddingHorizontal: 0,
    padding: 0,
    backgroundColor: Colors.grayish,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default RoleAndIdBasedButtons;
