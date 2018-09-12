import express from 'express';
import getLogger from '../lib/logger';
import { wrapAsync } from '../lib/errors';
import { checkBody } from '../controllers';
import { createCharge } from '../controllers/payment';
import { upsertDonor, createTransaction, updateTransactionStatus } from '../controllers/wordpress';
import { sendPaymentConfirmation, returnConfirmationData } from '../controllers/confirmation';

const router = express.Router();
const logger = getLogger('routes/payment');

logger.verbose('adding /payment routes...');

router.post(
  '/card/charge',
  checkBody,
  wrapAsync(upsertDonor),
  wrapAsync(createTransaction),
  wrapAsync(createCharge),
  wrapAsync(updateTransactionStatus),
  wrapAsync(sendPaymentConfirmation),
  returnConfirmationData
);

logger.verbose('added /payment routes');

export default router;
