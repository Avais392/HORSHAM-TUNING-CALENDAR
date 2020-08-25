import {AUTHENTICATE, LOGOUT} from '../actions';

const initialState = {
  userType: 'user',
  userEmail: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
