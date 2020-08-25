export const getTimeDifferenceInMinutes = (time1, time2) => {
  time1 = time1.split(':');
  time2 = time2.split(':');
  let difference = time1[0] - time2[0];
  difference = difference * 60 + (time1[1] - time2[1]);
  return difference;
};
