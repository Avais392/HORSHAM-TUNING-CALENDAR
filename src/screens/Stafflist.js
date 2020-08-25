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
} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from '../Firebase';
import Header from '../components/Header';

import * as actions from '../store/actions';

class StafflistScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userslist: [{id: 'fekho', email: 'sample'}],
      visibleUsersList: [],
    };
  }
  getUsersList = async () => {
    let userslist = [];
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
    return userslist;
  };
  async componentDidMount() {
    let userslist = [];
    userslist = await this.getUsersList();
    this.setState({userslist: userslist});
    console.log(this.state.userslist);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Header
          title={'Stafflist'}
          // rightIcon={<Icon name="calendar-plus" size={25} />}
          // onPressRightButton={() =>
          //   this.props.navigation.navigate('CreateAppointment')
          // }
        />
        { console.log('ulist',this.state.userslist) }
        <SafeAreaView style={styles.container}>
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
                      {item?.email}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : null}
        </SafeAreaView>
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
    margin: 20,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#aaa',
    // height: 40,
    padding: 10,
  },
});

const mapToStateProps = state => {
  return {appointment: state.appointment};
};

export default connect(
  mapToStateProps,
  actions,
)(StafflistScreen);
