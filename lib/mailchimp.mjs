import md5 from 'crypto-js/md5';
import getLogger from './logger';
import { get, post } from './request';

const logger = getLogger('lib/mailchimp');

const membersUri = `${process.env.MAILCHIMP_BASE}/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

/**
 * Check if donor is already in list
 */
export const checkSubscription = email => {
  logger.verbose(`Checking if ${email} is already in the list...`);
  const uri = `${membersUri}/${md5(email).toString()}`;
  const response = get(uri);
  logger.verbose('GET response:');
  logger.verbose(JSON.stringify(response));
  return response;
};

/**
 * Add donor to the list
 */
export const subscribe = (email, first, last) => {
  logger.verbose(`Adding ${email} to the list...`);
  const payload = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: first,
      LNAME: last,
    },
  };
  const response = post(membersUri, payload, false);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(response));
  return response;
};
