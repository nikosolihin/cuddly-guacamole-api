import axios from 'axios';
import getLogger from './logger';

const logger = getLogger('lib/request');

axios.defaults.headers.post['Content-Type'] = 'application/json';

const xenditSecret =
  process.env.NODE_ENV === 'development' ? process.env.XENDIT_SECRET_DEV : process.env.XENDIT_SECRET_PROD;

const mailchimpUser = process.env.MAILCHIMP_USER;
const mailchimpPass = process.env.MAILCHIMP_API_KEY;

const logAndReturn = val => {
  const { status, statusText } = val;
  logger.verbose('%d: %s', status, statusText);
  return val;
};

export const get = uri => {
  logger.verbose('Sending a GET request to %s', uri);
  return axios
    .get(uri, {
      auth: {
        username: mailchimpUser,
        password: mailchimpPass,
      },
    })
    .then(logAndReturn)
    .catch(({ response }) => logAndReturn(response));
};

export const post = (uri, payload, isPayment = true, config = {}) => {
  logger.verbose('Sending a POST request to %s', uri);
  logger.verbose('Payload:', payload);
  return axios
    .post(uri, payload, {
      auth: {
        username: isPayment ? xenditSecret : mailchimpUser,
        password: isPayment ? '' : mailchimpPass,
      },
      ...config,
    })
    .then(logAndReturn);
};
