import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../constants/Colors';
import * as actions from '../store/actions';

const StartupScreen = props => {
  const dispatch = useDispatch();
  const user_type = useSelector(state => state.auth.userType);
  console.log(user_type);
  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    console.log(userData);
    if (!userData) {
      if (user_type === 'admin') {
        props.navigation.navigate('AdminAuth');
      } else if (user_type === 'user') {
        props.navigation.navigate('Auth');
      }
      return;
    }
    const transformedData = JSON.parse(userData);
    const {userId, userType} = transformedData;
    // const expirationDate = new Date(expiryDate);

    // if (userId) {
    //   if (user_type === 'admin' && userType === 'admin') {
    //     props.navigation.navigate('UsersList');
    //   } else if (user_type === 'user') {
    //     props.navigation.navigate('Auth');
    //   }
    // }
    if (userId) {
      if (userType === 'admin') {
        props.navigation.navigate('UsersList');
      } else {
        props.navigation.navigate('Calendar');
        dispatch(actions.authenticate(userId));
      }
    }
  };
  useEffect(() => {
    setTimeout(tryLogin, 1000);
    // tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
      <Text style={styles.text}>HORSHAM TUNING</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartupScreen;
