import createError from 'http-errors';
import getLogger from '../lib/logger';
import { subscribe, checkSubscription } from '../lib/mailchimp';

const logger = getLogger('controllers/subcription');

/**
 * Subscribe donor into the mailing list
 */
export const upsertDonor = async (req, res, next) => {
  const { trxId } = res.locals.payment;
};
