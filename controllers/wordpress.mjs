import getLogger from '../lib/logger';
import { isExistingTrx, createTrx, updateTrx } from '../lib/transaction';

const logger = getLogger('controllers/wordpress');

/**
 * Create a new transaction
 */
export const createTransaction = async (req, res, next) => {
  const { trxId } = req.body;
  const transaction = await isExistingTrx(trxId);
  if (!transaction) {
    const newTrxId = await createTrx({ payload });
    res.locals.trxId = newTrxId;
  } else {
    await updateTrx(trxId, { payload });
    res.locals.trxId = trxId;
  }
  return next();
};

/**
 * Update a transaction
 */
export const updateTransactionStatus = async (req, res, next) => {
  const { trxId } = req.body;
  const {
    data: { status },
  } = res.locals.payment;
  res.locals.transaction = await updateTrx(trxId, {
    status: status === 'CAPTURED' ? 'success' : 'failed',
  });
  return next();
};
