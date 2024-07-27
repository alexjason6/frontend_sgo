import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment-timezone';

moment.locale('pt-br');

export default function dateFormat(timestamp) {
  const convertUnixToDate = moment.unix(timestamp);
  const setDateUTC = moment(convertUnixToDate).format('YYYY-MM-DD HH:mm:ss');
  const date = moment(setDateUTC).fromNow();

  return date;
}

dateFormat.propTypes = {
  timestamp: PropTypes.string.isRequired,
};
