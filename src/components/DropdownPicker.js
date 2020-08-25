import React, {Component} from 'react';
import {Text} from 'react-native';
import CustomLabel from '../components/CustomLabel';
import Spacer from '../components/Spacer';
import DropDownPicker from 'react-native-dropdown-picker';

class CustomDropdownPicker extends Component {
  render() {
    return (
      <Spacer disable vertical={1}>
        <CustomLabel label={`${this.props.label}:`} />
        <DropDownPicker
          items={this.props.items}
          defaultValue={this.props.items[0].value}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.props.onChangeItem(item)}
        />
      </Spacer>
    );
  }
}

export default CustomDropdownPicker;
