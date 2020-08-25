import {AsyncStorage} from 'react-native';
import firebase from '../../Firebase';
import * as actions from './index';

export const addAppointment = (date, appointment) => {
  return async (dispatch, getState) => {
    console.log('addAppointment');

    let userData = await AsyncStorage.getItem('userData');
    // await dispatch(actions.authenticate(userData.userId));
    const {userId} = JSON.parse(userData);

    console.log(getState().appointment.appointments);
    console.log('u', JSON.parse(userData).userId);
    console.log('a', getState().auth);
    console.log('d', date);

    // await firebase
    //   .database()
    //   .ref(`users/${userData.userId}/appointments/${date}/appointments`)
    //   .once('value', snapshot => {
    //     if (snapshot.exists()) {
    //       console.log('h', Object.values(snapshot.val()).length);
    firebase
      .database()
      .ref(`users/${userId}/appointments/${date}/appointments`)
      .push(appointment)
      .then(() => actions.getAppointments());

    //   }
    // });
    //       const userData = snapshot.val();
    //       const UUID = Object.keys(userData)[0];
    //       saveDataToStorage(UUID);
    //       dispatch(authenticate(UUID, userData[UUID].email));
    //       console.log('exists!', Object.keys(userData)[0]);
    //       return;
    //     }
    //   })
    //   .then(() => {});
  };
};

export const getAppointments = () => {
  return async (dispatch, getState) => {
    console.log('getAppointment');

    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    await dispatch(actions.authenticate(userData.userId));
    const {userId} = userData;
    console.log(userId);
    await firebase
      .database()
      .ref(`users/${userId}/appointments/`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          let appointments = {};
          let dates = Object.keys(snapshot.val());

          dates.forEach(date => {
            console.log('da', snapshot.val()[date]['appointments']);
            let appts = Object.keys(snapshot.val()[date]['appointments']).map(
              key => snapshot.val()[date]['appointments'][key],
              // () => ({})
            );
            console.log('appts', appts);
            appointments = {...appointments, [date]: {appointments: appts}};
          });
          console.log('happj',appointments);
          dispatch({
            type: 'GET_APPOINTMENTS',
            payload: {appointments},
          });
        }
        else{
          alert('user dont exist')
        }
      });
    //       const userData = snapshot.val();
    //       const UUID = Object.keys(userData)[0];
    //       saveDataToStorage(UUID);
    //       dispatch(authenticate(UUID, userData[UUID].email));
    //       console.log('exists!', Object.keys(userData)[0]);
    //       return;
    //     }
    //   })
    //   .then(() => {});
  };
};
