import createError from 'http-errors';
import getLogger from '../lib/logger';
import { isExistingTrx, createTrx, updateTrx } from '../lib/mail';

const logger = getLogger('controllers/confirmation');

/**
 * Send a confirmation email based on transaction status
 */
export const sendEmail = async (req, res, next) => {
  const { trxId } = res.locals.payment;
  const { trxId } = res.locals.transaction;

  // Format prices
  txData.onetimeAmount = txData.onetimeAmount ? formatPrice(txData.onetimeAmount) : '-';

  txData.sponsorshipAmount = txData.sponsorshipAmount ? formatPrice(txData.sponsorshipAmount) : '-';

  txData.totalAmount = formatPrice(txData.totalAmount);

  const result = await sendEmail(false, status === 'SUCCESS', txData, donorData);
};
