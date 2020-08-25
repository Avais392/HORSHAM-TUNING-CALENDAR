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
  FlatList,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

import firebase from '../../Firebase';
import Header from '../../components/Header';

import * as actions from '../../store/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';

class UsersListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userslist: [],
      visibleUsersList: [],
    };
  }

  async componentDidMount() {
    let userslist = {};
    await firebase
      .database()
      .ref(`users`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          userslist = Object.keys(snapshot.val()).map(key => ({
            ...snapshot.val()[key],
            id: key,
          }));
        }
      });
    this.setState({userslist: userslist});
    console.log(this.state.userslist);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Header
          title={'Stafflist'}
          rightIcon={<Icon name="plus" size={25} />}
          onPressRightButton={() =>
            this.props.navigation.navigate('CreateUser')
          }
        />
        {/* <ScrollView> */}
        <SafeAreaView style={styles.container}>
          {/* <Modal
            // style={{margin: 50}}
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
             alert('Modal has been closed.');
            }}>
            <View style={styles.modal}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Date
              </Text>
              <Text style={{marginLeft: 20, fontSize: 12}}>Time</Text>
            </View>
          </Modal> */}
          {/* <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Date</Text>
            <Text style={{marginLeft: 20, fontSize: 12}}>Time</Text> */}
          {/* <FlatList
            data={this.state.userslist}
            ></FlatList> */}
          {this.state.userslist ? (
            <FlatList
              data={this.state.userslist}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.notification}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 12, textAlign: 'justify'}}>
                      {item['email']}
                      {this.state.visibleUsersList?.includes(item.id)
                        ? `   (Pass : ${item['password']}) `
                        : null}
                    </Text>

                    {this.state.visibleUsersList?.includes(item.id) ? (
                      <Icon
                        name="eye-off"
                        size={18}
                        onPress={() =>
                          this.setState({
                            visibleUsersList: this.state.visibleUsersList.filter(
                              user => user !== item.id,
                            ),
                          })
                        }
                      />
                    ) : (
                      <Icon
                        name="eye"
                        size={18}
                        onPress={() =>
                          this.setState({
                            visibleUsersList: [
                              ...this.state.visibleUsersList,
                              item.id,
                            ],
                          })
                        }
                      />
                    )}
                  </View>
                </View>
              )}
            />
          ) : null}
        </SafeAreaView>
        {/* </ScrollView> */}
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
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#aaa',
    // height: 40,
    padding: 10,
  },
  modal: {
    flex: 1,
    margin: 50,
    marginVertical: 100,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 2,
    padding: 100,
  },
});

const mapToStateProps = state => {
  return {appointment: state.appointment};
};

export default connect(
  mapToStateProps,
  actions,
)(UsersListScreen);
