const initialState = {
  appointments: {
    // '2020-07-25': {
    //   appointments: [
    //     {
    //       label: 'Leaving',
    //       time: '17:00:00',
    //       duration: 30,
    //       MOT: true,
    //     },
    //     {
    //       label: 'Leaving',
    //       time: '16:00:00',
    //       duration: 30,
    //       MOT: true,
    //     },
    //   ],
    // },
    // '2020-09-02': {
    //   appointments: [
    //     {
    //       label: 'Leaving',
    //       time: '09:00:00',
    //       duration: 30,

    //       MOT: true,
    //     },
    //     {
    //       label: 'Leaving',
    //       time: '13:00:00',
    //       duration: 30,

    //       MOT: true,
    //     },
    //   ],
    // },
  },
  userEmail: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_APPOINTMENTS':
      console.log('GET_APPOINTMENTS', action.payload.appointments);
      return {...state, appointments: action.payload.appointments};
    default:
      return state;
  }
};
