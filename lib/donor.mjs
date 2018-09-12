import wp from './wordpress';
import getLogger from './logger';
import { isEmpty } from './helpers';

const logger = getLogger('lib/donor');

/**
 * Return just what we need
 */
const returnDonor = data => {
  if (!isEmpty(data)) {
    const { id, acf } = data;
    return { id, ...acf };
  }
  return false;
};

/**
 * Check if donor is already in WP via phone
 */
export const isExistingDonor = async phone => {
  logger.verbose('Checking for existing donor with phone %s...', phone);
  const donor = await wp
    .donors()
    .phone(phone)
    .then(res => returnDonor(res.shift()));
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(donor));
  return donor;
};

/**
 * Create a new donor
 */
export const createDonor = async data => {
  logger.verbose('Creating a new donor...');
  const { first, last } = data;
  const title = `${first} ${last}`;
  const payload = {
    title,
    content: title,
    status: 'publish',
    fields: {
      ...data,
    },
  };
  const donor = await wp
    .donors()
    .create(payload)
    .then(res => returnDonor(res));
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(donor));
  return donor;
};
