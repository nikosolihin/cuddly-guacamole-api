import wp from './wordpress';
import getLogger from './logger';

const logger = getLogger('lib/transaction');

export const isExistingTrx = trxId =>
  wp
    .transactions()
    .cuid(trxId)
    .then(trx => trx.shift());

export const createTrx = ({ trxId, method, amount, projectId, keywords }) => {
  // if txId does not exist
  logger.verbose('Creating a new %s transaction (%s)', method, trxId);
  const payload = {
    title: trxId,
    content: trxId,
    status: 'publish',
    fields: {
      status: 'initiated',
      trxId,
      method,
      amount,
      projectId,
      keywords,
    },
  };
  const response = wp
    .transactions()
    .create(payload)
    .then(res => res);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(response));
  return response;
};

export const updateTrx = (trxId, fields) =>
  wp
    .transactions()
    .cuid(trxId)
    .then(trx =>
      wp
        .transactions()
        .id(trx.shift().id)
        .update({ fields })
    )
    .then(res => res);
