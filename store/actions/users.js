import User from '../../models/user';
import AsyncStorage from '@react-native-community/async-storage';

import {URL, PORT} from 'react-native-dotenv';

export const SET_USERS = 'SET_USERS';
export const SET_ADMINS = 'SET_ADMINS';
export const SET_LOGGED_IN_USER_INFO = 'SET_LOGGED_IN_USER_INFO';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      const response = await fetch(`${URL}${PORT}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            resData[key]._id,
            resData[key].firstName,
            resData[key].lastName,
            resData[key].email,
            resData[key].role,
            resData[key].remainingDaysAvaliable,
            resData[key].remainingDays,
            resData[key].transferFromPreviousYear,
            resData[key].userDaysPerYear,
            resData[key].reviewersList,
          ),
        );
      }
      dispatch({
        type: SET_USERS,
        users: loadedUsers.filter(user => user.id !== data.userId),
      });
    } catch (error) {
      //send it to your own analytic server
      throw error;
    }
  };
};

export const fetchLoggedInUserInfo = token => {
  return async dispatch => {
    try {
      const response = await fetch(`${URL}${PORT}/api/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      dispatch({
        type: SET_LOGGED_IN_USER_INFO,
        userInfo: resData,
      });
    } catch (error) {
      //send it to your own analytic server
      throw error;
    }
  };
};

export const addUser = (
  firstName,
  lastName,
  email,
  password,
  reviewersList,
) => {
  return async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      const response = await fetch(`${URL}${PORT}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          email,
          reviewersList,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.errorMsg);
      } else {
        throw new Error(resData.successMessage);
      }

      /*     dispatch({
        type: SET_SERVER_MESSAGE,
        serverMessage: resData.successMessage,
      }); */
    } catch (error) {
      //sending error to my analytical server
      throw error;
    }
  };
};

export const fetchAdmins = () => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      const response = await fetch(`${URL}${PORT}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
      });
      const resData = await response.json();

      const loadedAdmins = resData.filter(admin => {
        return admin.role === 'Admin';
      });

      const admins = [];

      for (const key in loadedAdmins) {
        admins.push({
          id: loadedAdmins[key]._id,
          firstName: loadedAdmins[key].firstName,
          lastName: loadedAdmins[key].lastName,
        });
      }

      dispatch({
        type: SET_ADMINS,
        admins: admins,
      });
    } catch (error) {
      throw new Error('Hello');
    }
  };
};

export const resetPassword = (password, newPassword) => {
  return async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      const response = await fetch(
        `${URL}${PORT}/api/users/${data.userId}/changePassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.token,
          },
          body: JSON.stringify({
            password,
            newPassword,
          }),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.errorMsg);
      } else {
        throw new Error(resData.successMessage);
      }
    } catch (error) {
      //sending error to my analytical server
      throw error;
    }
  };
};
