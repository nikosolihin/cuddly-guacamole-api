import wp from './wordpress';
import getLogger from './logger';

const logger = getLogger('lib/transaction');

export const upsertTransaction = ({ txId, method, amount, projectId, keywords }) => {
  // what happens if .cuid(txId) doesnt exist?
  // test it!
  wp
    .transactions()
    .cuid(txId)
    .then(tx =>
      wp
        .transactions()
        .id(tx.shift().id)
        .update({
          fields: { txStatus: status }
        })
    )
    .then(res => res);
  // if txId does not exist
  logger.verbose('Creating a new %s transaction (%s)', method, txId);
  const payload = {
    title: txId,
    content: txId,
    status: "publish",
    fields: {
      status: "initiated",
      txId,
      method,
      amount,
      projectId,
      keywords,
    }
  };
  const response = wp.transactions().create(payload).then(res => res);
  logger.verbose('POST response:');
  logger.verbose(JSON.stringify(response));
  return response;
};


// Transaction needs to have xendit ID
https://dashboard.xendit.co/dashboard/credit_cards/5b9516933d85bb9f10febf31
https://dashboard.xendit.co/dashboard/credit_cards
