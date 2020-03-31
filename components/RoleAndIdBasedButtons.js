import React from 'react';
import {View, StyleSheet} from 'react-native';

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
      {role === 'Admin' && status === 'Pending' ? (
        <View style={styles.buttonWrapper}>
          <RoundedButton
            style={styles.actions}
            title="Approve"
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
      {role === 'Admin' && (
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
            console.log(itemData.item);
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
