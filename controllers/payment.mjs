import createError from 'http-errors';
import getLogger from '../lib/logger.mjs';
import { getStuff } from '../lib/payment.mjs';

const logger = getLogger('controllers/payment');

/**
 * Request body should not be empty
 */
export const checkBody = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const err = createError(400, 'Empty request body');
    logger.error(err);
    return next(err);
  }
  console.log('I got body');
  return next();
};

/**
 * Get Stuff
 */
export const getPayment = async (req, res, next) => {
  logger.verbose('requesting stuff for @%s', 'niko');
  // const response = await getStuff(user);
  return res.status(200).json({
    error: `Whoops! @ has not contributed.`,
  });
};

// logger.verbose(`@%s %s a contributor.`, username, contributor ? 'is' : 'is not');
