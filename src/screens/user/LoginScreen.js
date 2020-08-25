import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Text} from 'react-native-elements';
import * as actions from '../../store/actions';
import firebase from '../../Firebase';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    // this.input = React.createRef();
    this.state = {
      email: '',
      password: '',
      adminCode: '',
      loading: false,
      error: '',
    };
  }
  handleInputChange = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  loginUser = async () => {
    console.log('hop');
    await this.props.login(this.state.email, this.state.password);
    const userData = await AsyncStorage.getItem('userData');
    // if (userData.userId) {
      this.props.navigation.navigate('Calendar');
    // }
  };
  render() {
    return (
      <View style={styles.screenContainer}>
        <View
          style={{
            margin: 10,
            marginBottom: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30}}>WELCOME USER </Text>
          <Text>Login</Text>
        </View>
        <Input
          value={this.state.email}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="email@address.com"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={text => this.handleInputChange(text, 'email')}
        />
        <Input
          value={this.state.password}
          secureTextEntry
          placeholder="Password"
          leftIcon={{type: 'font-awesome-5', name: 'lock'}}
          inputContainerStyle={styles.inputContainerStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={text => this.handleInputChange(text, 'password')}
        />
        {this.state.error !== '' ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
        {/* <Input
          placeholder="Admin Code"
          value={this.state.adminCode}
          leftIcon={{type: 'font-awesome-5', name: 'qrcode'}}
          inputContainerStyle={styles.inputContainerStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
        /> */}
        <View style={{width: 200}}>
          <Button
            title="LOG IN"
            loading={false}
            onPress={() => this.loginUser()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  leftIconContainerStyle: {
    margin: 5,
    marginHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});

const mapToStateProps = state => {
  return {auth: state.auth};
};
export default connect(
  mapToStateProps,
  actions,
)(LoginScreen);
