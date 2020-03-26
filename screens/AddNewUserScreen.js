import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Alert,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import MyIcon from '../components/MyIcon';
import Card from '../components/Card';
import Input from '../components/Input';
import HeaderText from '../components/HeaderText';
import ResponsiveText from '../components/ResponsiveText';
import RoundedButton from '../components/RoundedButton';
import Colors from '../constants/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import * as userActions from '../store/actions/users';

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

const AddNewAbsencesScreen = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const admins = useSelector(state => state.users.admins);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reviewersList: [],
    },
    inputValidities: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      reviewersList: false,
    },
    formIsValid: false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);

    try {
      await dispatch(
        userActions.addUser(
          formState.inputValues.firstName,
          formState.inputValues.lastName,
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.reviewersList,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
    navigation.navigate('User I Monitor', {
      message: 'User successufully added',
    });
    setIsLoading(false);
  }, [dispatch, navigation, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('Notification!', error, [{text: 'Okay'}]);
    }
  }, [error]);

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

  const loadAdmins = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(userActions.fetchAdmins());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadAdmins().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAdmins]);

  const setReviewersHandler = id => {
    const existingIds = formState.inputValues.reviewersList.filter(
      adminId => adminId === id,
    );
    let action;
    if (existingIds.length !== 0) {
      action = formState.inputValues.reviewersList.filter(
        adminId => adminId !== id,
      );
    } else {
      action = formState.inputValues.reviewersList.concat(id);
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: action,
      isValid: true,
      input: 'reviewersList',
    });
  };

  const checkAdmin = id => {
    const reviewers = formState.inputValues.reviewersList;
    for (const key in reviewers) {
      if (reviewers[key] === id) {
        return true;
      }
    }
    return false;
  };

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.formContainer}>
        {/*  contentContainerStyle={styles.scrollWrapper}> */}
        <View>
          <HeaderText>Add New User</HeaderText>
        </View>
        <View style={styles.form}>
          <ScrollView>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>First Name :</ResponsiveText>
              <View style={styles.inputContainer}>
                <Input
                  id="firstName"
                  style={styles.textInput}
                  password
                  placeholder="Enter new users first name"
                  placeholderTextColor={Colors.whiteish_opacity}
                  onInputChange={inputChangeHandler}
                  errorText="Please new users first name!"
                  autoCapitalize="none"
                  returnKeyType="next"
                  required
                />
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>Last Name :</ResponsiveText>
              <View style={styles.inputContainer}>
                <Input
                  id="lastName"
                  style={styles.textInput}
                  password
                  placeholder="Enter new users last name"
                  placeholderTextColor={Colors.whiteish_opacity}
                  onInputChange={inputChangeHandler}
                  errorText="Please enter new users last name!"
                  autoCapitalize="none"
                  returnKeyType="next"
                  required
                />
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>E-mail :</ResponsiveText>
              <View style={styles.inputContainer}>
                <Input
                  id="email"
                  style={styles.textInput}
                  password
                  placeholder="Enter new users email"
                  placeholderTextColor={Colors.whiteish_opacity}
                  onInputChange={inputChangeHandler}
                  errorText="Please enter new users email!"
                  autoCapitalize="none"
                  returnKeyType="next"
                  required
                />
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>Password :</ResponsiveText>
              <View style={styles.inputContainer}>
                <Input
                  id="password"
                  style={styles.textInput}
                  password
                  placeholder="Enter new users password"
                  placeholderTextColor={Colors.whiteish_opacity}
                  onInputChange={inputChangeHandler}
                  errorText="Please enter new users password!"
                  autoCapitalize="none"
                  returnKeyType="next"
                  required
                />
              </View>
            </View>
            <View style={styles.labelInputContanier}>
              <ResponsiveText style={styles.label}>Reviewers :</ResponsiveText>
              <View style={styles.reviewerWrapper}>
                {admins.length >= 0 &&
                  admins.map((admin, index) => {
                    return (
                      <CheckBox
                        onPress={() => setReviewersHandler(admin.id)}
                        key={index}
                        containerStyle={styles.checkBox}
                        textStyle={styles.reviewers}
                        title={admin.firstName + ' ' + admin.lastName}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor={Colors.accent}
                        checked={checkAdmin(admin.id)}
                      />
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            style={styles.button}
            title="Add User"
            onPress={submitHandler}
          />
        </View>
      </Card>
    </View>
  );
};

AddNewAbsencesScreen.navigationOptions = navData => {
  // const submitFn = navData.navigation.getParam('submit');
  const title = navData.navigation.state.routeName;
  return {
    headerTitle: title,
    headerLeft: () => (
      <MyIcon
        androidIcon="menu"
        iosIcon="ios-menu"
        action={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),

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
    height: '90%',
    width: '90%',
    padding: Dimensions.get('screen').width / 18,
    paddingTop: Dimensions.get('screen').height / 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: Dimensions.get('screen').width / 20,
    paddingVertical: Dimensions.get('screen').height / 20,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '60%',
  },
  textInput: {
    width: '100%',
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 2,
    color: 'white',
  },
  labelInputContanier: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('screen').height / 80,
  },

  checkBox: {
    backgroundColor: Colors.plumish,
    borderColor: Colors.plumish,
    margin: 0,
    padding: 0,
  },
  reviewers: {
    color: Colors.whiteish_opacity,
  },
  reviewerWrapper: {justifyContent: 'space-around'},
  buttonContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height / 30,
  },
  button: {
    width: '90%',
  },
});
export default AddNewAbsencesScreen;
