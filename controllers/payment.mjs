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
export const createCharge = async (req, res, next) => {
  /**
   * TODO: Check for failure with testing number
   */
  const { tokenId, maskedCard, amount, cvc } = req.body;
  res.locals.payment = await chargeCard(tokenId, maskedCard, amount, cvc);
  return next();
};

/**
 * Return JSON needed to build the
 * frontend invoice
 */
export const returnInvoiceData = async (req, res, next) => {
  const { name } = res.locals.payment;
  const { name } = res.locals.transaction;
  res.status(200).json({
    name,
  });
};
