import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Input from '../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import RoundedButton from '../components/RoundedButton';

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

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('AbsencesOverview');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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

  return (
    <ImageBackground
      source={require('../assets/photos/absenceplannerfront.png')}
      style={styles.screen}>
      <View style={styles.overlay} />
      <View style={styles.authContainer}>
        <View>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
              <View style={styles.iconsAndTitleConainer}>
                <View style={styles.icons}>
                  <Icon
                    name="child"
                    size={33}
                    color={Colors.whiteish_opacity}
                  />
                  <Icon name="plane" size={33} color={Colors.accent} />
                  <Icon name="bed" size={33} color={Colors.primary} />
                </View>
                <Text style={styles.title}>absence planner</Text>
              </View>

              <View style={styles.formTitleContainer}>
                <Text style={styles.footerText}>
                  {!isSignup ? 'Login' : 'Sign Up'}
                </Text>
              </View>
              <View style={styles.formComponents}>
                <Input
                  style={styles.input}
                  id="email"
                  placeholder="Please edit your email"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid email address."
                  onInputChange={inputChangeHandler}
                />
              </View>
              <View style={styles.formComponents}>
                <Input
                  style={styles.input}
                  id="password"
                  placeholder="Please edit your password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={8}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                />
              </View>
              {isLoading ? (
                <ActivityIndicator
                  style={styles.formComponents}
                  size="small"
                  color={Colors.primary}
                />
              ) : (
                <RoundedButton
                  style={styles.formComponents}
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
              <RoundedButton
                style={styles.formComponents}
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
              <View style={styles.footer}>
                <Text style={{...styles.footerText, color: 'white'}}>by</Text>
                <Text style={styles.footerText}>Zlatan</Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.plumish_opacity,
  },
  iconsAndTitleConainer: {
    alignItems: 'center',
    marginVertical: Dimensions.get('screen').height / 30,
  },
  icons: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Dimensions.get('screen').width / 14,
    paddingHorizontal: Dimensions.get('screen').width / 20,

    //backgroundColor: Colors.plumish_opacity,
    borderRadius: 25,
    paddingVertical: 7,
  },
  formTitleContainer: {
    alignItems: 'center',
    marginBottom: Dimensions.get('screen').height / 40,
  },
  authContainer: {
    width: '80%',
    height: '80%',
    padding: 20,
    backgroundColor: 'transparent',
    overlayColor: 'black',
  },
  formComponents: {
    marginVertical: Dimensions.get('screen').height / 100,
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 3,
    elevation: 5,
    textAlign: 'center',
    borderBottomColor: 'transparent',
  },
  footer: {
    marginTop: Dimensions.get('screen').height / 35,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.whiteish_opacity,
    fontWeight: 'bold',
    fontSize: Dimensions.get('screen').width / 20,
  },
});

export default AuthScreen;
