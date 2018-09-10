import md5 from 'crypto-js/md5';
import getLogger from './logger';
import { get, post } from './request';

const logger = getLogger('lib/mailchimp');

const membersUri = `${process.env.MAILCHIMP_API_URI}/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

/**
 * Check if donor is already in list
 */
export const checkSubscription = async email => {
  logger.verbose(`Checking if ${email} is already in the list...`);
  const uri = `${membersUri}/${md5(email).toString()}`;
  const { data } = await get(uri);
  logger.verbose('GET response:');
  logger.verbose(JSON.stringify(data));
  return data;
};

/**
 * Add donor to the list
 */
export const subscribe = async (email, first, last, phone) => {
  logger.verbose(`Adding ${email} to the list...`);
  const payload = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: first,
      LNAME: last,
      PHONE: phone,
    },
  };
  const { data } = await post(membersUri, payload, false);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(data));
  return data;
};
