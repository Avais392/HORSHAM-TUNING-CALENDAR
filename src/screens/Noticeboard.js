import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/Header';

import * as actions from '../store/actions';

class NoticeboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.getAppointments();
    console.log('NoticeboardScreen ComponentDidMount', this.props.appointment);
  }
  updateSelectedCalendarMonth(selectedCalendarMonthString) {
    this.setState({
      selectedCalendarMonthString,
      calendarLoading: true,
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Header
          title={'Notifications'}
          //   rightIcon={<Icon name="calendar-plus" size={25} />}
          //   onPressRightButton={() =>
          //     this.props.navigation.navigate('CreateAppointment')
          //   }
        />
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              20 August
            </Text>
            
            <Text style={{marginLeft: 20, fontSize: 12}}>21:15</Text>
            <View style={styles.notification}>
              <Text style={{fontSize: 12, textAlign: 'justify'}}>
                Sample Notifications displayed on the Noticeboard. This will be
                deleted from the Noticeboard once 24 hours passed
              </Text>
            </View>
            <Text style={{marginLeft: 20, fontSize: 12}}>18:00</Text>
            <View style={styles.notification}>
              <Text style={{fontSize: 12, textAlign: 'justify'}}>
                Confernece meeting down in the Hall. This is particularly useful
                if snapToInterval is enabled, since it does not follow typical
                touch patterns.
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  //   scrollView: {},
  container: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    padding: 10,
  },
  notification: {
    margin: 20,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#aaa',
    // height: 40,
    padding: 10,
  },
});

const mapToStateProps = state => {
  return {appointment: state.appointment};
};

export default connect(
  mapToStateProps,
  actions,
)(NoticeboardScreen);
