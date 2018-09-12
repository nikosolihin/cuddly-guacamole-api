import { chargeCard } from '../lib/xendit';

/**
 * Initiate credit card charge
 */
export const createCharge = async (req, res, next) => {
  const { trxId } = res.locals.transaction;
  res.locals.payment = await chargeCard(trxId, req.body);
  return next();
};
