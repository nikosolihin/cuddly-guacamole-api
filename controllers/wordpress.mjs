import getLogger from '../lib/logger';
import { isExistingDonor, createDonor } from '../lib/donor';
import { createTrx, updateTrx } from '../lib/transaction';

const logger = getLogger('controllers/wordpress');

/**
 * Transaction is uniquely new every time.
 * Must create a new transaction.
 */
export const createTransaction = async (req, res, next) => {
  const { id: donor, first, last, email, phone } = res.locals.donor;
  const { activity, amount, method } = req.body;
  res.locals.transaction = await createTrx({
    amount,
    method,
    activity,
    donor,
    keywords: `${first} ${last} ${email} ${phone}`,
  });
  return next();
};

/**
 * Update a transaction
 */
export const updateTransactionStatus = async (req, res, next) => {
  const { trxId } = res.locals.transaction;
  const { status } = res.locals.payment;
  res.locals.transaction = await updateTrx(trxId, {
    status: status === 'CAPTURED' ? 'success' : 'failed',
  });
  return next();
};

/**
 * Donor can be past donor - upsert donor.
 */
export const upsertDonor = async (req, res, next) => {
  const { phone } = req.body;
  const donor = await isExistingDonor(phone);
  logger.verbose('This donor %s in the database', !donor ? 'does not exist' : 'exists');
  if (!donor) {
    res.locals.donor = await createDonor(req.body);
  } else {
    res.locals.donor = donor;
  }
  return next();
};
