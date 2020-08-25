import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CustomLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{flexDirection: 'row'}, this.props.style]}>
        <Text style={{fontSize: 14, color: '#555', paddingVertical: 10}}>
          {this.props.label}
        </Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  labelText: {},
});
