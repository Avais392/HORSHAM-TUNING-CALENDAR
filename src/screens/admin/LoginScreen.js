import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

class LoginScreen extends Component {
  static navigationOptions = {
    headerStyle: {height: 0},
  };
  constructor(props) {
    super(props);
    // this.input = React.createRef();
    this.state = {
      email: '',
      password: '',
      adminCode: '',
      loading: false,
    };
  }
  login = () => {
    if (
      this.state.email === 'admin@admin.com' &&
      this.state.password === '123456'
    ) {
      // AsyncStorage.setItem(
      //   'userData',
      //   JSON.stringify({
      //     usertType:'admin',
      //     userId:'admin@admin.com',
      //   }),
      // );
      this.props.navigation.navigate('UsersList');
    } else {
      this.setState({error: 'Incorrect email or password'});
    }
  };
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={{marginBottom: 50}}>
          <Text style={{fontSize: 30}}>WELCOME ADMIN</Text>
        </View>

        <Input
          value={this.state.email}
          inputContainerStyle={styles.inputContainerStyle}
          placeholder="email@address.com"
          onChangeText={email => this.setState({email})}
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          leftIconContainerStyle={styles.leftIconContainerStyle}
        />
        <Input
          value={this.state.password}
          secureTextEntry
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          leftIcon={{type: 'font-awesome-5', name: 'lock'}}
          inputContainerStyle={styles.inputContainerStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
        />
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
        <View style={{width: 200}}>
          <Button title="LOG IN" loading={false} onPress={() => this.login()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
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
    // fontSize: 20,
    color: 'red',
    textAlign: 'left',
    marginBottom: 10,
  },
});

export default LoginScreen;
