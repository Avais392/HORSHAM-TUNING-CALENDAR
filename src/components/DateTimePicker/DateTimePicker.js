import React, {useState} from 'react';
import {View, Button, Platform, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default (CustomDateTimePicker = ({
  children,
  timeCallback,
  dateCallback,
}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'time') timeCallback(moment(currentDate).format('HH:mm:ss'));
    if (mode === 'date') dateCallback(moment(currentDate).format('YYYY-MM-DD'));
    console.log(moment(currentDate).minute());
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{flex: 0, width: '100%'}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            showDatepicker();
          }}>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
});
