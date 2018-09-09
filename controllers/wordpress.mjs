import createError from 'http-errors';
import getLogger from '../lib/logger';

const logger = getLogger('controllers/wordpress');

/**
 * Initiate credit card charge
 */
export const upsertTransaction = async (req, res) => {
  // Check if tx exist here not in lib!
  //
  // const { tokenId, maskedCard, amount, cvc } = req.body;
  // const { status, data } = await chargeCard(tokenId, maskedCard, amount, cvc);
  // return res.status(status).json(data);
};
