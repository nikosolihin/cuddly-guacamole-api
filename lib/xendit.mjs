import cuid from 'cuid';
import getLogger from './logger';
import { post } from './request';
import { formatAmount } from './helpers';

const logger = getLogger('lib/payment');

/**
 * Use a token to create a charge
 */
export const chargeCard = (tokenId, maskedCard, amount, cvc) => {
  logger.verbose(`Charging ${formatAmount(amount)} to card ${maskedCard} ...`);
  const payload = {
    token_id: tokenId,
    external_id: cuid(),
    amount,
    card_cvn: cvc,
    descriptor: process.env.XENDIT_DESCRIPTOR,
  };
  const response = post(process.env.XENDIT_CHARGE, payload);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(response));
  return response;
};
