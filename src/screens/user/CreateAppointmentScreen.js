import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {CheckBox, Button} from 'react-native-elements';
import DropDownPicker from '../../components/DropdownPicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
} from 'native-base';
import moment, {duration} from 'moment';

import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import Spacer from '../../components/Spacer';
import CustomLabel from '../../components/CustomLabel';

import * as actions from '../../store/actions';
import {getTimeDifferenceInMinutes} from '../../helper';

const colors = {
  pink: '#fa3ea2',
  green: '#009900',
  blue: '#0000ff',
  yellow: '#f5f500',
  dark_gray: '#262626',
};
let data = {
  categories: [
    {
      label: 'Collection / Delivery',
      value: 'collection',
      icon: () => <Icon name="circle" size={18} color={colors.blue} />,
    },
    {
      label: 'Leaving',
      value: 'leaving',
      icon: () => <Icon name="circle" size={18} color={colors.green} />,
    },
    {
      label: 'Waiting',
      value: 'waiting',
      icon: () => <Icon name="circle" size={18} color={colors.pink} />,
    },
    {
      label: 'Other',
      value: 'other',
      icon: () => <Icon name="circle" size={18} color={colors.yellow} />,
    },
  ],
  times: [
    {label: '00:00', value: '00:00:00'},
    {label: '00:15', value: '00:15:00'},
    {label: '00:30', value: '00:30:00'},
    {label: '00:45', value: '00:45:00'},
    {label: '01:00', value: '01:00:00'},
    {label: '01:15', value: '01:15:00'},
    {label: '01:30', value: '01:30:00'},
    {label: '01:45', value: '01:45:00'},
    {label: '02:00', value: '02:00:00'},
    {label: '02:15', value: '02:15:00'},
    {label: '02:30', value: '02:30:00'},
    {label: '02:45', value: '02:45:00'},
    {label: '03:00', value: '03:00:00'},
    {label: '03:15', value: '03:15:00'},
    {label: '03:30', value: '03:30:00'},
    {label: '03:45', value: '03:45:00'},
    {label: '04:00', value: '04:00:00'},
    {label: '04:15', value: '04:15:00'},
    {label: '04:30', value: '04:30:00'},
    {label: '04:45', value: '04:45:00'},
    {label: '05:00', value: '05:00:00'},
    {label: '05:15', value: '05:15:00'},
    {label: '05:30', value: '05:30:00'},
    {label: '05:45', value: '05:45:00'},
    {label: '06:00', value: '06:00:00'},
    {label: '06:15', value: '06:15:00'},
    {label: '06:30', value: '06:30:00'},
    {label: '06:45', value: '06:45:00'},
    {label: '07:00', value: '07:00:00'},
    {label: '07:15', value: '07:15:00'},
    {label: '07:30', value: '07:30:00'},
    {label: '07:45', value: '07:45:00'},
    {label: '08:00', value: '08:00:00'},
    {label: '08:15', value: '08:15:00'},
    {label: '08:30', value: '08:30:00'},
    {label: '08:45', value: '08:45:00'},
    {label: '09:00', value: '09:00:00'},
    {label: '09:15', value: '09:15:00'},
    {label: '09:30', value: '09:30:00'},
    {label: '09:45', value: '09:45:00'},
    {label: '10:00', value: '10:00:00'},
    {label: '10:15', value: '10:15:00'},

    {label: '10:30', value: '10:30:00'},
    {label: '10:45', value: '10:45:00'},
    {label: '11:00', value: '11:00:00'},
    {label: '11:15', value: '11:15:00'},
    {label: '11:30', value: '11:30:00'},

    {label: '11:45', value: '11:45:00'},
    {label: '12:00', value: '12:00:00'},
    {label: '12:15', value: '12:15:00'},
    {label: '12:30', value: '12:30:00'},
    {label: '12:45', value: '12:45:00'},

    {label: '13:00', value: '13:00:00'},
    {label: '13:15', value: '13:15:00'},
    {label: '13:30', value: '13:30:00'},
    {label: '13:45', value: '13:45:00'},
    {label: '14:00', value: '14:00:00'},

    {label: '14:15', value: '14:15:00'},
    {label: '14:30', value: '14:30:00'},
    {label: '14:45', value: '14:45:00'},
    {label: '15:00', value: '15:00:00'},
    {label: '15:15', value: '15:15:00'},

    {label: '15:30', value: '15:30:00'},
    {label: '15:45', value: '15:45:00'},
    {label: '16:00', value: '16:00:00'},
    {label: '16:15', value: '16:15:00'},
    {label: '16:30', value: '16:30:00'},
    {label: '16:45', value: '16:45:00'},
    {label: '17:00', value: '17:00:00'},
    {label: '17:15', value: '17:15:00'},
    {label: '17:30', value: '17:30:00'},
    {label: '17:45', value: '17:45:00'},
    {label: '18:00', value: '18:00:00'},
    {label: '18:15', value: '18:15:00'},
    {label: '18:30', value: '18:30:00'},
    {label: '18:45', value: '18:45:00'},
    {label: '19:00', value: '19:00:00'},
    {label: '19:15', value: '19:15:00'},
    {label: '19:30', value: '19:30:00'},
    {label: '19:45', value: '19:45:00'},
    {label: '20:00', value: '20:00:00'},
    {label: '20:15', value: '20:15:00'},
    {label: '20:30', value: '20:30:00'},
    {label: '20:45', value: '20:45:00'},
    {label: '21:00', value: '21:00:00'},
    {label: '21:15', value: '21:15:00'},
    {label: '21:30', value: '21:30:00'},
    {label: '21:45', value: '21:45:00'},
    {label: '22:00', value: '22:00:00'},
    {label: '22:15', value: '22:15:00'},
    {label: '22:30', value: '22:30:00'},
    {label: '22:45', value: '22:45:00'},
    {label: '23:00', value: '23:00:00'},
    {label: '23:15', value: '23:15:00'},
    {label: '23:30', value: '23:30:00'},
    {label: '23:45', value: '23:45:00'},
  ],
  duration: Array.apply(0, Array(48)).map(function(_, i) {
    let val = (i + 1) * 15;

    return {label: val, value: `${val}`};
  }),
};

class CreateAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    console.log('jj', data.duration);

    this.state = {
      data: {
        categories: [
          {
            label: 'Collection / Delivery',
            value: 'collection',
            icon: () => <Icon name="circle" size={18} color={colors.blue} />,
          },
          {
            label: 'Leaving',
            value: 'leaving',
            icon: () => <Icon name="circle" size={18} color={colors.green} />,
          },
          {
            label: 'Waiting',
            value: 'waiting',
            icon: () => <Icon name="circle" size={18} color={colors.pink} />,
          },
          {
            label: 'Other',
            value: 'other',
            icon: () => <Icon name="circle" size={18} color={colors.yellow} />,
          },
        ],
        times: [
          {label: '10:00', value: '10:00:00'},
          {label: '10:15', value: '10:15:00'},

          {label: '10:30', value: '10:30:00'},
          {label: '10:45', value: '10:45:00'},
          {label: '11:00', value: '11:00:00'},
          {label: '11:15', value: '11:15:00'},
          {label: '11:30', value: '11:30:00'},

          {label: '11:45', value: '11:45:00'},
          {label: '12:00', value: '12:00:00'},
          {label: '12:15', value: '12:15:00'},
          {label: '12:30', value: '12:30:00'},
          {label: '12:45', value: '12:45:00'},

          {label: '13:00', value: '13:00:00'},
          {label: '13:15', value: '13:15:00'},
          {label: '13:30', value: '13:30:00'},
          {label: '13:45', value: '13:45:00'},
          {label: '14:00', value: '14:00:00'},

          {label: '14:15', value: '14:15:00'},
          {label: '14:30', value: '14:30:00'},
          {label: '14:45', value: '14:45:00'},
          {label: '15:00', value: '15:00:00'},
          {label: '15:15', value: '15:15:00'},

          {label: '15:30', value: '15:30:00'},
          {label: '15:45', value: '15:45:00'},
          {label: '16:00', value: '16:00:00'},
          {label: '16:15', value: '16:15:00'},
          {label: '16:30', value: '16:30:00'},
          {label: '16:45', value: '16:45:00'},
          {label: '17:00', value: '17:00:00'},
          {label: '17:15', value: '17:15:00'},
          {label: '17:30', value: '17:30:00'},
          {label: '17:45', value: '17:45:00'},
          {label: '18:00', value: '18:00:00'},
        ],
        duration: Array.apply(0, Array(32)).map(function(_, i) {
          let val = (i + 1) * 15;

          return {label: val, value: `${val}`};
        }),
      },
      category: 'collection',
      duration: '15',
      checkMOT: false,
      date: moment().format('YYYY-MM-DD'),
      time: '10:00:00',
    };

    console.log();
  }

  render() {
    return (
      <Container style={[styles.container]}>
        <DropDownPicker
          label={'Category'}
          items={data.categories}
          defaultValue={this.state.category}
          onChangeItem={item =>
            this.setState({
              category: item.value,
            })
          }
        />

        <Spacer disable vertical={1}>
          <CustomLabel label={'Date:'} />
          <DateTimePicker dateCallback={date => this.setState({date})}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                width: '100%',
                marginVertical: 5,
              }}>
              <Icon
                name="calendar"
                size={18}
                color={colors.dark_gray}
                style={{marginRight: 20}}
              />
              <Text>{this.state.date}</Text>
            </View>
          </DateTimePicker>
        </Spacer>

        <DropDownPicker
          label={'Time'}
          items={this.state.data.times}
          defaultValue={this.state.time}
          onChangeItem={item => {
            this.setState({
              time: item.value,
            });
            let currentTime = moment().format('HH:mm:ss');
            let d = data.duration.filter(({value}) => {
              if (value <= getTimeDifferenceInMinutes('18:00:00', item.value)) {
                return {label: value, value};
              }
            });
            console.log(d);
            //  this.setState({data:{...this.state.data,duration:d}})
          }}
        />

        <DropDownPicker
          label={'Duration (in minutes)'}
          items={this.state.data.duration.filter(
            item =>
              item.value <=
              getTimeDifferenceInMinutes('18:00:00', this.state.time),
          )}
          defaultValue={this.state.duration}
          onChangeItem={item =>
            this.setState({
              duration: item.value,
            })
          }
        />

        <Spacer disable vertical={1} style={{margin: -10}}>
          <CustomLabel
            style={{marginHorizontal: 10}}
            label={'MOT Check (for vehicles):'}
          />
          <CheckBox
            size={22}
            title={'MOT'}
            checked={this.state.checkMOT}
            // style={{margin:10}}
            onPress={() => this.setState({checkMOT: !this.state.checkMOT})}
          />
        </Spacer>
        {/* </Spacer> */}
        <Spacer vertical={1}>
          <Button
            title="Submit"
            onPress={() => {
              alert(this.state.date);
              this.props.addAppointment(this.state.date, {
                MOT: this.state.checkMOT,
                time: this.state.time,
                duration: this.state.duration,
                label: this.state.category,
              });
            }}
          />
        </Spacer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    height: '100%',

    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#f1f2f4',
  },
});
const mapToStateProps = state => {
  return {auth: state.auth};
};
export default connect(
  mapToStateProps,
  actions,
)(CreateAppointmentScreen);
