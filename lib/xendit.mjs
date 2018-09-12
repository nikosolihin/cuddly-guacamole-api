import getLogger from './logger';
import { post } from './request';
import { formatAmount } from './helpers';

const logger = getLogger('lib/payment');

/**
 * Use a token to create a charge
 */
export const chargeCard = async (external_id, { tokenId, maskedCard, amount, cvc }) => {
  logger.verbose('Charging %s to card %s...', formatAmount(amount), maskedCard);
  const payload = {
    token_id: tokenId,
    external_id,
    amount,
    card_cvn: cvc,
    descriptor: process.env.XENDIT_DESCRIPTOR,
  };
  const { data: charge } = await post(process.env.XENDIT_CHARGE, payload);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(charge));
  return charge;
};
