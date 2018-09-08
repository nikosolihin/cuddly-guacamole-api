import axios from 'axios';
import getLogger from './logger';

const logger = getLogger('lib/request');

axios.defaults.headers.post['Content-Type'] = 'application/json';

const xenditSecret =
  process.env.NODE_ENV === 'development' ? process.env.XENDIT_SECRET_DEV : process.env.XENDIT_SECRET_PROD;

const logAndReturn = val => {
  const { status, statusText } = val;
  logger.verbose('%d: %s', status, statusText);
  return val;
};

export const put = (uri, payload, config = {}) => {
  logger.verbose('Sending a PUT request to %s', uri);
  logger.verbose('Payload:', payload);
  return axios
    .put(uri, payload, {
      auth: {
        username: xenditSecret,
        password: '',
      },
      ...config,
    })
    .then(logAndReturn);
};

export const post = (uri, payload, config = {}) => {
  logger.verbose('Sending a POST request to %s', uri);
  logger.verbose('Payload:', payload);
  return axios
    .post(uri, payload, {
      auth: {
        username: xenditSecret,
        password: '',
      },
      ...config,
    })
    .then(logAndReturn);
};
