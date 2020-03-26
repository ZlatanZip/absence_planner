import React, {useReducer, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import RoundedButton from '../components/RoundedButton';
import Colors from '../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const MyDatePicker = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: new Date(),
    isValid: false,
    touched: false,
  });
  const [show, setShow] = useState(false);
  const {onSelectDate, id} = props;
  const buttonTitle = inputState.value.toLocaleDateString();

  useEffect(() => {
    if (inputState.touched) {
      onSelectDate(id, inputState.value, inputState.isValid);
    }
  }, [onSelectDate, inputState, id]);

  const showDatePicker = () => {
    setShow(true);
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  const onSelect = (event, selectedDate) => {
    let isValid = true;
    const currentDate = selectedDate || inputState.value;
    setShow(false);
    lostFocusHandler();
    dispatch({type: INPUT_CHANGE, value: currentDate, isValid: isValid});
  };

  return (
    <View>
      <RoundedButton
        style={styles.button}
        title={buttonTitle}
        onPress={showDatePicker}
      />
      {show && (
        <DateTimePicker
          minimumDate={inputState.value}
          timeZoneOffsetInMinutes={0}
          value={inputState.value}
          mode="date"
          display="default"
          onChange={onSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.grayish,
    fontWeight: 'normal',
  },
});

export default MyDatePicker;
