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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarDayComponent from '../../components/CalendarDayComponent';
import CalendarHeaderComponent from '../../components/CalendarHeaderComponent';
import CalendarFooterComponent from '../../components/CalendarFooterComponent';
import AgendaScreen from '../../components/agenda';
import ExpandableCalendar from '../../components/expandableCalendar';
import Calendars from '../../components/calendars.js';
import Header from '../../components/Header';

import * as actions from '../../store/actions';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

class HomeCalendarScreen extends React.Component {
  constructor(props) {
    super(props);

    // const userData = AsyncStorage.getItem('userData');
    // if (!userData.userid) {
    //   this.props.navigation.navigate('Auth')
    // }
    this.state = {
      selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
      selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
      calendarHeaderData: {},
      calendarMarkedDates: this.props.appointment.appointments,
      // horizontal: true,
      ratesInventoryDataArray: [],
      saveButtonClicked: false,
      calendarLoading: true,
    };

    this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
    this.onPressArrowRight = this.onPressArrowRight.bind(this);
    this.onPressListView = this.onPressListView.bind(this);
    this.onPressGridView = this.onPressGridView.bind(this);
  }

  async componentDidMount() {
    await this.props.getAppointments();
    this.props.navigation.addListener('didFocus', async () => {
      await this.props.getAppointments();
    });
    console.log('HomeCalendarScreen ComponentDidMount', this.props.appointment);
  }
  updateSelectedCalendarMonth(selectedCalendarMonthString) {
    this.setState({
      selectedCalendarMonthString,
      calendarLoading: true,
    });
  }

  onDayPress(date) {
    selectedCalendarDate = moment(date.dateString);
    const selectedCalendarDateString = selectedCalendarDate.format(
      'YYYY-MM-DD',
    );
    // console.log(moment().format('HH:mm'));
    // this.setState({
    //   ratesInventoryDataArray: [], // reset inventory data
    //   selectedCalendarDateString:'2020-06-26',
    //   selectedCalendarMonthString: '2020-06-26'
    // });
    /*this.fetchDemandData(selectedCalendarDateString);
    this.fetchMultiDaysInventoryData(selectedCalendarDateString);
    this.fetchRatesAndInventoryData(selectedCalendarDateString);*/
  }

  onPressArrowLeft(currentMonth, addMonthCallback) {
    const monthStartDate = moment(currentMonth.getTime()).startOf('month');

    // don't go back for past months
    if (monthStartDate > currentDate) {
      addMonthCallback(-1);
      const selectedCalendarMonthString = moment(currentMonth.getTime())
        .add(-1, 'month')
        .format('YYYY-MM-DD');
      this.updateSelectedCalendarMonth(selectedCalendarMonthString);
    }
  }

  onPressArrowRight(currentMonth, addMonthCallback) {
    addMonthCallback(1);
    const selectedCalendarMonthString = moment(currentMonth.getTime())
      .add(1, 'month')
      .format('YYYY-MM-DD');
    this.updateSelectedCalendarMonth(selectedCalendarMonthString);
  }

  onPressListView() {
    this.setState({horizontal: true});
  }

  onPressGridView() {
    this.setState({horizontal: false});
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Header
          rightIcon={<Icon name="calendar-plus" size={25} />}
          onPressRightButton={() =>
            this.props.navigation.navigate('CreateAppointment')
          }
        />
        <ScrollView>
          <SafeAreaView>
            <Calendar
              current={this.state.selectedCalendarMonthString}
              minDate={minimumDate.format('YYYY-MM-DD')}
              dayComponent={CalendarDayComponent}
              calendarHeaderComponent={CalendarHeaderComponent}
              headerData={this.state.calendarHeaderData}
              style={styles.calendar}
              // onPressArrowLeft={this.onPressArrowLeft}
              // onPressArrowRight={this.onPressArrowRight}
              // onPressListView={this.onPressListView}
              // onPressGridView={this.onPressGridView}
              markedDates={this.props.appointment.appointments}
              horizontal={this.state.horizontal}
              onDayPress={this.onDayPress}
              showPastDatesInHorizontal={1}
              horizontalEndReachedThreshold={50}
              horizontalStartReachedThreshold={0}
              loading={this.state.calendarLoading}
            />
            {/* <CalendarFooterComponent
            calendarDateString={selectedCalendarDate.format('DD MMM, YYYY')}
          /> */}
            {/* <Calendars /> */}
            {/* <Input /> */}
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
  return {appointment: state.appointment};
};

export default connect(
  mapToStateProps,
  actions,
)(HomeCalendarScreen);
