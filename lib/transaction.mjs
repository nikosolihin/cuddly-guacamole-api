import cuid from 'cuid';
import wp from './wordpress';
import getLogger from './logger';

const logger = getLogger('lib/transaction');

/**
 * Return just what we need
 */
const returnTrx = data => {
  const { id, acf } = data;
  return { id, ...acf };
};

/**
 * Create a new transaction
 */
export const createTrx = async data => {
  const { method } = data;
  const trxId = cuid();
  logger.verbose('Creating a new %s transaction (%s)...', method, trxId);
  const payload = {
    title: trxId,
    content: trxId,
    status: 'publish',
    fields: {
      status: 'initiated',
      trxId,
      ...data,
    },
  };
  const trx = await wp
    .transactions()
    .create(payload)
    .then(res => returnTrx(res));
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(trx));
  return trx;
};

/**
 * Update a transaction's status
 */
export const updateTrx = async (trxId, fields) => {
  logger.verbose('Updating the status of transaction %s...', trxId);
  const trx = await wp
    .transactions()
    .cuid(trxId)
    .then(v =>
      wp
        .transactions()
        .id(v.shift().id)
        .update({ fields })
    )
    .then(res => returnTrx(res));
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(trx));
  return trx;
};
