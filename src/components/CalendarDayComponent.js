import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// class InventoryCount extends React.PureComponent {
//   getFooterTextStyle() {
//     const { marking = {}, state } = this.props;
//     const style = {
//       color: '#c1c2c1'
//     };

//     if (marking.inventory > 0 && state !== 'disabled') {
//       style.color = '#4caf50';
//     }
//     return style;
//   }

//   getInventoryCount() {
//     const { marking = {}, state } = this.props;
//     if (typeof marking === 'object' && state !== 'disabled') {
//       if (marking.inventory >= 0) {
//         return marking.inventory;
//       }
//     }
//     if (state === 'disabled') {
//       return '';
//     } else {
//       return 'NA';
//     }
//   }

//   render() {
//     return (
//       <View style={styles.footer} {...this.props.copilot}>
//         <Text style={this.getFooterTextStyle()}>
//           {/* {this.getInventoryCount()} */}
//         </Text>
//       </View>
//     );
//   }
// }

class CalendarDayComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  getContentStyle() {
    const {state, marking = {}} = this.props;
    const style = {
      content: {},

      text: {
        color: '#181c26',
      },
    };

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    } else {
      if (marking.partiallyBlocked) {
        style.content.borderColor = '#c1c2c1';
        style.content.borderRadius = 50;
        style.content.borderWidth = 1;
      } else if (marking.partiallySoldOut) {
        style.content.borderColor = '#e35052';
        style.content.borderRadius = 50;
        style.content.borderWidth = 1;
      }

      if (marking.selected) {
        style.text.color = '#fff';
        style.content.backgroundColor = '#216bc9';
        style.content.borderRadius = 50;
      } else if (marking.fullyBlocked) {
        style.text.color = '#fff';
        style.content.backgroundColor = '#c1c2c1';
        style.content.borderRadius = 50;
      } else if (marking.fullySoldOut) {
        style.text.color = '#fff';
        style.content.backgroundColor = '#e35052';
        style.content.borderRadius = 50;
      }
    }

    return style;
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  getAppointmentColor(label) {
    switch (label) {
      case 'Service1':
        return {backgroundColor: 'green'};
      case 'Service2':
        return {backgroundColor: 'blue'};
      case 'Service3':
        return {backgroundColor: 'yellow'};
      case 'Service4':
        return {backgroundColor: 'pink'};
    }
  }

  render() {
    const contentStyle = this.getContentStyle();
    const highDemandImage = require('../images/high-demand.png');

    return (
      <View style={[styles.container]} {...this.props.copilot}>
        <View style={styles.header}>
          {this.props.horizontal ? (
            <Text style={styles.weekName} numberOfLines={1}>
              {weekDaysNames[this.props.date.weekDay].toUpperCase()}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={[
            ,
            // styles.content,
            // contentStyle.content,

            {height: 100, width: 55},
          ]}
          onPress={this.onDayPress}>
          <View style={[styles.innerContainer]}>
            {this.props.marking.appointments?.length > 0 && (
              <View
                style={[
                  styles.leftContainer,
                  this.props.marking.appointments[0].MOT
                    ? {borderTopWidth: 5, borderColor: 'red'}
                    : null,
                  this.getAppointmentColor(this.props.marking.appointments[0].label),
                ]}
              />
            )}
            {/* {console.log(this.props.marking.appointments[0].MOT)} */}
            {this.props.marking.appointments?.length > 1 && (
              <View
                style={[
                  styles.rightContainer,
                  this.props.marking.appointments[1].MOT
                    ? {borderTopWidth: 5, borderColor: 'red'}
                    : null,
                  this.getAppointmentColor(this.props.marking.appointments[1].label),
                  
                ]}>
                {/* <View
                  style={{backgroundColor: 'red', width: '100%', height: 5}}
                /> */}
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Text style={[styles.addButton]}>
                {String(this.props.children)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <InventoryCount {...this.props} /> */}
      </View>
    );
  }
}

class CalendarDayWrapper extends React.PureComponent {
  render() {
    return <CalendarDayComponent {...this.props} />;
  }
}

CalendarDayComponent.propTypes = {
  children: PropTypes.any,
  state: PropTypes.string,
  marking: PropTypes.any,
  horizontal: PropTypes.bool,
  date: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  current: PropTypes.string,
  copilot: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 7,
    // marginRight: 7,
    // backgroundColor:'#c1c1c1',
    borderRadius: 5,
  },
  weekName: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7c7c7c',
  },
  content: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
  },
  smallIcon: {
    width: 12,
    height: 12,
    position: 'absolute',
    top: -1,
    right: -1,
  },
  innerContainer: {
    flex: 1,
    // flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,

    backgroundColor: '#66cc66',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#996699',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    zIndex: 1111,
    // width:20
  },
});

export default CalendarDayWrapper;
