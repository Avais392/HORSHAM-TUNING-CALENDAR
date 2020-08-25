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
import {Calendar, Agenda} from 'react-native-calendars';
import moment from 'moment';

import CalendarDayComponent from '../components/CalendarDayComponent';
import CalendarHeaderComponent from '../components/CalendarHeaderComponent';
import CalendarFooterComponent from '../components/CalendarFooterComponent';
import AgendaScreen from '../components/agenda';
import TimelineCalendar from '../components/timelineCalendar';
import ExpandableCalendar from '../components/expandableCalendar';
import Calendars from '../components/calendars.js';

import * as actions from '../store/actions';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

class AppointmentListScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.props.getAppointments();
    // console.log('jo', this.props.appointments);
    //this.setState({appointments})
    // const userData = AsyncStorage.getItem('userData');
    // if (!userData.userid) {
    //   this.props.navigation.navigate('Auth')
    // }
    this.state = {
      // appointments: [],
      //   selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
      //   selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
      //   calendarHeaderData: {},
      //   calendarMarkedDates: this.props.appointment.appointments,
      //   // horizontal: true,
      //   ratesInventoryDataArray: [],
      //   saveButtonClicked: false,
      //   calendarLoading: true,
    };

    // this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
    // this.onPressArrowRight = this.onPressArrowRight.bind(this);
    // this.onPressListView = this.onPressListView.bind(this);
    // this.onPressGridView = this.onPressGridView.bind(this);
  }
  async componentDidMount() {
    // this.props.navigation.addListener('didFocus', async () => {
    //   await this.props.getAppointments();
    // });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <SafeAreaView>
            {console.log('props', this.props.appointments)}
            <TimelineCalendar
              events={this.props.appointments}
              onScrollEnd={() => console.log('end from prosp')}
              onScrollTop={() => console.log('top from prosp')}
            />
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  //   scrollView: {},
});

const mapToStateProps = state => {
  console.log('list', state.appointment);
  let arr = [
    {
      start: '2020-09-06 22:30:00',
      end: '2020-09-06 23:30:00',
      title: 'Appointment 1',
      summary: 'Summary',
      color: '#e6add8',
    },
  ];
  const {appointments} = state.appointment;
  // arr.push({start:`${key}+' '+${appointments[key].time}`})
  console.log('cras', appointments);
  Object.keys(appointments).map(date =>
    console.log(
      Object.keys(appointments[date]['appointments']).map(app => {
        console.log(app);
        arr.push({
          start: moment(date + ' ' + appointments[date]['appointments'][app].time).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(date + ' ' + appointments[date]['appointments'][app].time)
            .add(45, 'minutes')
            .format('YYYY-MM-DD HH:mm:ss'),
          title: 'Appointment from Redux',
          summary: 'Add some background color.',
        });
      }),
    ),
  );

  // console.log(
  //   Object.keys(appointments).map(date =>
  //     appointments[date]['appointments'].forEach(app =>
  //       arr.push({
  //         start: moment(
  //           date + ' ' + appointments[date]['appointments'][app]['time'],
  //         ).format('YYYY-MM-DD HH:mm:ss'),
  //         end: moment(
  //           date + ' ' + appointments[date]['appointments'][app]['time'],
  //         )
  //           .add(45, 'minutes')
  //           .format('YYYY-MM-DD HH:mm:ss'),
  //         title: 'Appointment from Redux',
  //         summary: 'Add some background color.',
  //       }),
  //     ),
  //   ),
  // );
  console.log('array appou=intments', arr);

  return {appointments: arr};
};

export default connect(
  mapToStateProps,
  actions,
)(AppointmentListScreen);
