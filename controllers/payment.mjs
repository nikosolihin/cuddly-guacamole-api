import createError from 'http-errors';
import getLogger from '../lib/logger';
import { chargeCard } from '../lib/payment';

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
  return next();
};

/**
 * Get Stuff
 */
export const createCharge = (req, res) => {
  const { tokenId, amount, cvc } = req.body;
  const response = chargeCard(tokenId, amount, cvc);
  return res.status(200).json(response);
};
