import React, {Component} from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import * as actions from '../../store/actions';
import firebase from '../../Firebase';
import {SafeAreaView} from 'react-native-safe-area-context';

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

  createUser = () => {
    console.log('hel');
    // actions.signup(this.state.email, this.state.password);
    if (!this.state.email || !this.state.password) {
      this.setState({error: 'Please fill all the required fields.'});
    } else {
      this.setState({error: ''});
      firebase
        .database()
        .ref(`users`)
        .orderByChild('email')
        .equalTo(this.state.email)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            // const userData = snapshot.val();
            // console.log('exists!', userData);
            this.setState({error: 'User already exists.'});
            return;
          }
          console.log(
            firebase
              .database()
              .ref(`users`)
              .push({email: this.state.email, password: this.state.password}),
          );
          this.setState({email: '', password: ''});
          this.props.navigation.pop();
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.screenContainer}>
          <View style={styles.container}>
            <View
              style={{
                margin: 10,
                marginBottom: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Create User{' '}
              </Text>
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
              placeholder="Password"
              leftIcon={{type: 'font-awesome-5', name: 'lock'}}
              // containerStyle={{height: 100}}
              // inputStyle={{fontSize: 20}}
              inputContainerStyle={[styles.inputContainerStyle]}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              onChangeText={text => this.handleInputChange(text, 'password')}
            />
            {this.state.error !== '' ? (
              <Text style={styles.error}>{this.state.error}</Text>
            ) : null}
            <View style={{width: 200}}>
              <Button
                title="CREATE USER"
                loading={false}
                onPress={() => this.createUser()}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#ddd',
    margin: 30,
    marginVertical: 200,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: '80%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:200
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    // fontSize: 5,
    borderWidth: 1,
    borderRadius: 5,
    // height: 40,
  },
  leftIconContainerStyle: {
    margin: 5,
    marginHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});
export default LoginScreen;
