import createError from 'http-errors';
import getLogger from '../lib/logger';
import { chargeCard } from '../lib/xendit';

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
 * Initiate credit card charge
 */
export const createCharge = async (req, res) => {
  const { tokenId, maskedCard, amount, cvc } = req.body;
  const { status, data } = await chargeCard(tokenId, maskedCard, amount, cvc);
  return res.status(status).json(data);
};
