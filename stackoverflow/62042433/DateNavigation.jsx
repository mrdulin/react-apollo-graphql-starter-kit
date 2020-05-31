import React from 'react';
import moment from 'moment';

function DateNavigation({ locale, date }) {
  return locale === 'en' ? (
    <span>{moment(date).format('DD.MM.YYYY')}</span>
  ) : (
    <span>{moment(date).format('YYYY.MM.DD')}</span>
  );
}

export default DateNavigation;
