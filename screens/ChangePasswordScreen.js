import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';

import MyIcon from '../components/MyIcon';
import Input from '../components/Input';
import Card from '../components/Card';
import HeaderText from '../components/HeaderText';
import RoundedButton from '../components/RoundedButton';
import ResponsiveText from '../components/ResponsiveText';

import * as userActions from '../store/actions/users';

import Colors from '../constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
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
  }
  return state;
};

const ChangePasswordScreen = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      password: '',
      newPassword: '',
      repeatedPassword: '',
    },
    inputValidities: {
      password: false,
      newPassword: false,
      repeatedPassword: false,
    },
    formIsValid: false,
  });

  const submitHandler = useCallback(async () => {
    /*  if (formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    } */
    setError(null);

    try {
      await dispatch(
        userActions.resetPassword(
          formState.inputValues.password,
          formState.inputValues.repeatedPassword,
        ),
      );
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, navigation, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('Notification!', error, [{text: 'Okay'}]);
    }
  }, [error, navigation]);

  /*  useEffect(() => {
    navigation.setParams({submit: submitHandler});
  }, [submitHandler, navigation]); */

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  console.log('hello');
  return (
    <View style={styles.screen}>
      {/*  <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={100}> */}
      <Card style={styles.formContainer}>
        <View>
          <HeaderText>Change Password</HeaderText>
        </View>
        <View style={styles.form}>
          <ScrollView>
            <ResponsiveText style={styles.label}>
              Current Password :
            </ResponsiveText>
            <Input
              id="password"
              style={styles.textInput}
              password
              placeholder="Enter your password"
              placeholderTextColor={Colors.whiteish_opacity}
              onInputChange={inputChangeHandler}
              errorText="Please enter your password!"
              autoCapitalize="none"
              returnKeyType="next"
              required
            />
            <ResponsiveText style={styles.label}>New Password :</ResponsiveText>
            <Input
              id="newPassword"
              password
              style={styles.textInput}
              placeholder="Enter new password"
              placeholderTextColor={Colors.whiteish_opacity}
              onInputChange={inputChangeHandler}
              errorText="Please enter a 8 digit password!"
              autoCapitalize="none"
              returnKeyType="next"
              minLength={8}
              required
            />
            <ResponsiveText style={styles.label}>
              Confirm New Password :
            </ResponsiveText>
            <Input
              id="repeatedPassword"
              style={styles.textInput}
              password
              placeholder="Repeat new password"
              placeholderTextColor={Colors.whiteish_opacity}
              onInputChange={inputChangeHandler}
              autoCapitalize="none"
              errorText="Repeated password dosen't match!"
              returnKeyType="next"
              minLength={8}
              required
            />
            <View style={styles.buttonContainer}>
              <RoundedButton
                style={styles.button}
                title="Change Password"
                onPress={submitHandler}
              />
            </View>
          </ScrollView>
        </View>
      </Card>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

ChangePasswordScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerRight: () => (
      <MyIcon androidIcon="check" iosIcon="ios-check" action={submitFn} />
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
    alignItems: 'center',
    height: '90%',
    width: '90%',
    padding: Dimensions.get('screen').width / 18,
    paddingVertical: Dimensions.get('screen').height / 20,
  },
  form: {
    height: '90%',
    width: '100%',
    padding: Dimensions.get('screen').width / 18,
    paddingVertical: Dimensions.get('screen').height / 30,
  },
  label: {
    marginTop: Dimensions.get('screen').height / 35,
    marginBottom: Dimensions.get('screen').height / 70,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: '100%',
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height / 30,
  },
  button: {
    width: '90%',
    marginTop: Dimensions.get('screen').height / 35,
    backgroundColor: Colors.primary,
  },
});

export default ChangePasswordScreen;
