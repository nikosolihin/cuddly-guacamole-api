import cuid from 'cuid';
import wp from './wordpress';
import getLogger from './logger';
import { post } from './request';
import { formatAmount } from './helpers';

const logger = getLogger('lib/transactions');

export const chargeCard = async (tokenId, amount, cvc) => {
  logger.verbose(`Charging card for ${formatAmount(amount)}...`);
  const payload = {
    token_id: tokenId,
    external_id: cuid(),
    amount,
    card_cvn: cvc,
    capture: false,
    descriptor: process.env.XENDIT_DESCRIPTOR,
  };
  const response = await post(process.env.XENDIT_CHARGE, payload);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(response));
  return response;
};

// export const getStuff = async slug => {
//   logger.verbose('Getting stuff with slug %s', slug);
//   // const { data: { total_count = 0 } = {} }
//   const response = await wp
//     .pages()
//     .slug(slug)
//     .then(res => res);
//   return response;
// };
