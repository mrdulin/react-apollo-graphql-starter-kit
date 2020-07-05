import moment from 'moment';

function getDates() {}

const getIntervalDates = (groupOfDates) => {
  const CURRENT_DATE = moment().format('YYYY-MM-DD');
  return getDates(CURRENT_DATE, groupOfDates);
};

const nextDates = (date, group) => {
  return exports.getIntervalDates(group);
};

exports.getIntervalDates = getIntervalDates;
exports.nextDates = nextDates;
