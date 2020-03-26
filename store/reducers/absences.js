import {
  CREATE_ABSENCE,
  SET_USER_ABSENCES,
  SET_ALL_ABSENCES,
} from '../actions/absences';
import Absence from '../../models/absence';

const initialState = {
  allAbsences: [],
  userAbsecnes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ABSENCES:
      return {
        allAbsences: action.allAbsences,
      };
    case SET_USER_ABSENCES:
      return {
        allAbsences: action.userAbsences,
      };
    case CREATE_ABSENCE:
      const newProduct = new Absence(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
  }
  return state;
};
