import Absence from '../../models/absence';
import AsyncStorage from '@react-native-community/async-storage';

export const DELETE_ABSENCE = 'DELETE_ABSENCE';
export const CREATE_ABSENCE = 'CREATE_ABSENCE';
export const UPDATE_ABSENCE = 'UPDATE_ABSENCE';
export const SET_ALL_ABSENCES = 'SET_ALL_ABSENCES';
export const SET_USER_ABSENCES = 'SET_USER_ABSENCES';

export const fetchAllAbsences = () => {
  return async (dispatch, getState) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);

      const response = await fetch(
        'http://192.168.1.3:3100/api/absences',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.token,
          },
        } /*,
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      }) 
    }*/,
      );
      const resData = await response.json();
      //console.log(resData);
      // before we unpack res. body we check the status

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const allAbsences = [];

      for (const key in resData) {
        allAbsences.push(
          new Absence(
            resData[key]._id,
            resData[key].userId._id,
            resData[key].userId.firstName,
            resData[key].userId.lastName,
            resData[key].Status,
            new Date(resData[key].startDate).toLocaleDateString(),
            new Date(resData[key].endDate).toLocaleDateString(),
            resData[key].type,
            resData[key].Description,
          ),
        );
      }

      dispatch({
        type: SET_ALL_ABSENCES,
        allAbsences: allAbsences,
        /* userAbsences: loadedAbsences.filter(
          prod => prod.ownerId !== data.userId,
        ), */
      });
    } catch (error) {
      //send it to your own analytic server
      throw error;
    }
  };
};

export const fetchMyAbsences = () => {
  return async (dispatch, getState) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);

      const response = await fetch(
        `http://192.168.1.3:3100/api/absences/${data.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.token,
          },
        },
      );
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const userAbsences = [];

      for (const key in resData) {
        userAbsences.push(
          new Absence(
            resData[key]._id,
            resData[key].userId,
            resData[key].userId.firstName,
            resData[key].userId.lastName,
            resData[key].Status,
            new Date(resData[key].startDate).toLocaleDateString(),
            new Date(resData[key].endDate).toLocaleDateString(),
            resData[key].type,
            resData[key].Description,
          ),
        );
      }

      dispatch({
        type: SET_USER_ABSENCES,
        userAbsences: userAbsences,
      });
    } catch (error) {
      //send it to your own analytic server
      throw error;
    }
  };
};

export const addNewAbsence = (
  startDate,
  endDate,
  returnDate,
  type,
  Description,
) => {
  return async (dispatch, getState) => {
    try {
      const Status = 'Pending';
      const userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      const userId = data.userId;
      const response = await fetch('http://192.168.1.3:3100/api/absences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          returnDate,
          Status,
          type,
          Description,
          userId,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.errorMsg);
      } else {
        throw new Error(resData.successMessage);
      }
    } catch (error) {}
  };
};

export const deleteAbsence = absenceId => {
  return async (dispatch, getState) => {
    const userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);

    const response = await fetch(
      `http://192.168.1.3:3100/api/absences/${absenceId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Some deleting issues');
    }

    dispatch({type: DELETE_ABSENCE, aid: absenceId});
  };
};

export const updateAbsence = (absenceId, startDate, endDate, Description) => {
  return async (dispatch, getState) => {
    const userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);
    const response = await fetch(
      `http://192.168.1.3:3100/api/absences/${absenceId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          Description,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
  };
};
