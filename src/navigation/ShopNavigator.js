/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Platform, SafeAreaView, Button, View, Text} from 'react-native';
// import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AdminLoginScreen from '../screens/admin/LoginScreen';
import CreateUserScreen from '../screens/admin/CreateUserScreen';
import UsersListScreen from '../screens/admin/UsersList';

import UserLoginScreen from '../screens/user/LoginScreen';
import HomeCalendarScreen from '../screens/user/HomeCalendarScreen';
import CreateAppointmentScreen from '../screens/user/CreateAppointmentScreen';
import AppointmentListScreen from '../screens/AppointmentList';

import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import NoticeboardScreen from '../screens/Noticeboard';
import StafflistScreen from '../screens/Stafflist';

const defaultNavOptions = {
  headerStyle: {
    height:0
    // backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const CalendarNavigator = createStackNavigator(
  {
    HomeCalendar: HomeCalendarScreen,
    CreateAppointment: CreateAppointmentScreen,
  },
  {
    defaultNavigationOptions: {
      header: props => {
       
        headerStyle: {
          outerHeight: 0;
        }
      },
    },
  },
  
);


// const ShopNavigator = createDrawerNavigator(
//   {
//     Product: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       const userId = useSelector((state) => state.auth.userId);
//       return (
//         <View style={{flex: 1, paddingTop: 20}}>
//           <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//             <DrawerItems {...props} />
//             {userId && (
//               <Button
//                 title="Logout"
//                 color={Colors.primary}
//                 onPress={() => {
//                   dispatch(actions.logout());
//                   // props.navigation.navigate('Auth');
//                 }}
//               />
//             )}
//           </SafeAreaView>
//         </View>
//       );
//     },
//   },
// );

const AuthNavigator = createStackNavigator(
  {
    Auth: UserLoginScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);
const AdminNavigator = createStackNavigator(
  {
    AdminAuth: AdminLoginScreen,
    CreateUser: CreateUserScreen,
    UsersList: UsersListScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);
const TabNavigator = createBottomTabNavigator(
  {
    Timeline: {
      screen: AppointmentListScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="timeline-text-outline"
            size={23}
            color={!focused ? '#a0a0a0' : '#0000ff'}
          />
        ),
        //  tabBarVisible:true,
      },
    },
    Home: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name="md-calendar-sharp"
            size={23}
            color={!focused ? '#a0a0a0' : '#0000ff'}
          />
        ),
        // tabBarVisible: false,
      },
    },
    Noticeboard: {
      screen: NoticeboardScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name="md-notifications-outline"
            size={23}
            color={!focused ? '#a0a0a0' : '#0000ff'}
          />
        ),
        // tabBarVisible: false,
      },
    },
    Stafflist: {
      screen: StafflistScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Ionicons
            name="md-list"
            size={23}
            color={!focused ? '#a0a0a0' : '#0000ff'}
          />
        ),
        // tabBarVisible: false,
      },
    },
    // ResetPassword: {
    //   screen: ResetPassword,
    //   path: 'reset-password/:token',
    //   navigationOptions: {
    //     tabBarVisible: false,
    //   },
    // },
    // EmailVerification: {
    //   screen: EmailVerification,
    //   path: 'email-verification',
    //   navigationOptions: {
    //     tabBarVisible: false,
    //   },
    // },
  },
  {
    initialRouteName: 'Home',
    lazy: false,
    // resetOnBlur:true
  },
);
const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Admin: AdminNavigator,
  Calendar: TabNavigator,
});

export default createAppContainer(MainNavigator);
