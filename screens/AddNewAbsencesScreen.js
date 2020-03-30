import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {View, Alert, Dimensions, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-community/async-storage';

import MyIcon from '../components/MyIcon';
import Card from '../components/Card';
import MyDatePicker from '../components/MyDatePicker';
import HeaderText from '../components/HeaderText';
import ResponsiveText from '../components/ResponsiveText';
import Input from '../components/Input';
import RoundedButton from '../components/RoundedButton';
import Colors from '../constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import * as absencesActions from '../store/actions/absences';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_RESET = 'FORM_RESET';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    /*  case FORM_RESET: {
      console.log(state);
      for (const key in state.inputValues) {
        state.inputValues[key] = null;
      }
      return state;
    } */
  }
  return state;
};

const AddNewAbsencesScreen = props => {
  const {navigation} = props;
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const remainingDays = useSelector(
    state => state.users.userInfo.remainingDaysAvaliable,
  );
  const userData = AsyncStorage.getItem('userData');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      startDate: null,
      endDate: null,
      returnDate: new Date(),
      type: 'Vacation',
      Description: '',
    },
    inputValidities: {
      startDate: false,
      endDate: false,
      retrunDate: true,
      type: false,
      Description: false,
    },
    formIsValid: false,
  });

  const onSelectDateHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const onSelectAbsenceTypeHandler = useCallback(
    inputValue => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: true,
        input: 'type',
      });
    },
    [dispatchFormState],
  );
  const resetHandler = useCallback(() => {
    dispatchFormState({
      type: FORM_RESET,
    });
  }, [dispatchFormState]);

  const submitHandler = useCallback(async () => {
    /* if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    } */
    setError(null);

    try {
      await dispatch(
        absencesActions.addNewAbsence(
          formState.inputValues.startDate,
          formState.inputValues.endDate,
          formState.inputValues.returnDate,
          formState.inputValues.type,
          formState.inputValues.Description,
        ),
      );
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, navigation, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('Notification!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View>
            <HeaderText style={styles.title}>Add New Absence</HeaderText>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>Start Date</ResponsiveText>
              <MyDatePicker id="startDate" onSelectDate={onSelectDateHandler} />
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>End Date</ResponsiveText>
              <MyDatePicker id="endDate" onSelectDate={onSelectDateHandler} />
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>
                Remaining days :
              </ResponsiveText>
              <View style={styles.remainingDays}>
                <ResponsiveText
                  style={
                    remainingDays < 0
                      ? styles.remainingDaysNone
                      : styles.remainingDaysLeft
                  }>
                  {remainingDays}
                </ResponsiveText>
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>Absence Type</ResponsiveText>
              <View style={styles.dropdownWrapper}>
                <ModalDropdown
                  showsVerticalScrollIndicator={false}
                  onSelect={(index, value) => onSelectAbsenceTypeHandler(value)}
                  dropdownTextHighlightStyle={styles.dropdownSelectedText}
                  dropdownTextStyle={styles.absenceTypeDropdownText}
                  dropdownStyle={styles.absenceTypeDropdown}
                  options={['Vacation', 'Illness', 'Childcare']}>
                  <MyIcon
                    title={formState.inputValues.type}
                    style={styles.absenceSelectArrow}
                    androidIcon="chevron-down"
                    iosIcon="ios-menu"
                  />
                </ModalDropdown>
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>
                Add Description (Optional)
              </ResponsiveText>
            </View>
            <Input
              id="Description"
              style={styles.textInput}
              placeholder="Enter a description of your leave"
              placeholderTextColor={Colors.whiteish_opacity}
              onInputChange={inputChangeHandler}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RoundedButton
                color={Colors.redish}
                style={styles.button}
                title="Reset From"
                onPress={resetHandler}
              />
              <RoundedButton
                style={styles.button}
                title="Add Absence"
                onPress={submitHandler}
              />
            </View>
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

AddNewAbsencesScreen.navigationOptions = navData => {
  return {
    headerRight: () => (
      <MyIcon
        androidIcon="check"
        iosIcon="ios-check"
        action={() => {
          navData.navigation.navigate();
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    justifyContent: 'space-between',
    height: '90%',
    width: '90%',
    paddingHorizontal: Dimensions.get('screen').width / 40,
    paddingTop: Dimensions.get('screen').height / 20,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: '100%',
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
    marginBottom: Dimensions.get('screen').height / 35,
  },
  labelInputContanier: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  remainingDays: {
    width: 'auto',
    minWidth: '40%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    marginRight: 5,
  },
  remainingDaysNone: {
    fontSize: 13,
    color: Colors.accent,
  },
  remainingDaysLeft: {
    fontSize: 15,
    color: Colors.whiteish_opacity,
    fontWeight: 'bold',
  },
  dropdownWrapper: {width: '35%'},
  absenceTypeDropdown: {
    alignItems: 'center',
    height: 120,
    width: '30%',
    backgroundColor: Colors.plumish,
    borderRadius: 5,
  },
  absenceTypeDropdownText: {
    fontSize: 14,
    backgroundColor: Colors.plumish,
    color: Colors.accent,
  },
  dropdownSelectedText: {color: 'white'},
  absenceSelectArrow: {margin: 0, color: Colors.accent},
  button: {
    marginTop: Dimensions.get('screen').height / 50,
  },
});
export default AddNewAbsencesScreen;
