import getLogger from '../lib/logger';
import { sendEmail } from '../lib/mail';

const logger = getLogger('controllers/confirmation');

/**
 * Send a confirmation email based on transaction status
 */
export const sendPaymentConfirmation = async (req, res, next) => {
  // const { paymentData } = res.locals.payment;
  // const { transactionData } = res.locals.transaction;
  const to = 'nikosolihin@gmail.com';
  const isSuccess = true;
  const template = isSuccess ? 'success' : 'failed';
  const subject = isSuccess ? process.env.CONFIRMATION_SUCCESS : process.env.CONFIRMATION_FAILED;
  const data = {
    name: 'Niko Solihin',
  };
  logger.verbose(`Sending a %s email to %s`, isSuccess ? 'confirmation' : 'rejection', to);
  const result = await sendEmail(to, subject, template, data);
  return next();
};

/**
 * Return data needed by the frontend confirmation screen
 */
export const returnConfirmationData = async (req, res, next) => {
  // const { name } = res.locals.payment;
  // const { name } = res.locals.transaction;
  // res.status(200).json({
  //   name,
  // });
};
