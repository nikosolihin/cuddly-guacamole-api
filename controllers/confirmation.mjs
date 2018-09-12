import getLogger from '../lib/logger';
import { sendEmail } from '../lib/mail';

const logger = getLogger('controllers/confirmation');

/**
 * Send a confirmation email based on transaction status
 */
export const sendPaymentConfirmation = async (req, res, next) => {
  const { email: to } = res.locals.donor;
  const { status } = res.locals.payment;
  const isSuccess = status === 'CAPTURED';
  const template = isSuccess ? 'success' : 'failed';
  const subject = isSuccess ? process.env.CONFIRMATION_SUCCESS : process.env.CONFIRMATION_FAILED;
  const data = {
    ...res.locals.donor,
    ...res.locals.payment,
    ...res.locals.transaction,
  };
  logger.verbose('Sending a %s email to %s...', isSuccess ? 'confirmation' : 'rejection', to);
  await sendEmail(to, subject, template, data);
  return next();
};

/**
 * Return data needed by the frontend confirmation screen
 */
export const returnConfirmationData = async (req, res, next) => {
  const { trxId, status: trxStatus } = res.locals.transaction;
  const { created, status: paymentStatus } = res.locals.payment;
  logger.verbose('Sending payment confirmation data to the frontend...');
  return res.status(200).json({
    trxId,
    trxStatus,
    paymentStatus,
    created,
  });
};
