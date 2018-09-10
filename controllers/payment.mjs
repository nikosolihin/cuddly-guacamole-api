import getLogger from '../lib/logger';
import { chargeCard } from '../lib/xendit';

const logger = getLogger('controllers/payment');

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
