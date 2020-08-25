import {AsyncStorage} from 'react-native';
import firebase from '../../Firebase';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId = null, userEmail = null) => {
  return dispatch => {
    dispatch({type: AUTHENTICATE, payload: {userId, userEmail}});
  };
};

export const signup = (email, password) => {
  // alert(password)
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwZMjeAJozr_csH5dA4rP1-dKi7Sn6ymU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      console.log(response.json().error);
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    console.log('login');
    await firebase
      .database()
      .ref(`users`)
      .orderByChild('email')
      .equalTo(email)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const UUID = Object.keys(userData)[0];
          saveDataToStorage(UUID);
          dispatch(authenticate(UUID, userData[UUID].email));
          console.log('exists!', Object.keys(userData)[0]);
          return;
        }
      })
      .then(() => {});
  };
};

export const logout = () => {
  alert('Logiutaction');
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (userId, usertType = 'user') => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      usertType,
      userId,
    }),
  );
};
