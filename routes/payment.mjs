import express from 'express';
import getLogger from '../lib/logger.mjs';
import { catchErrors } from '../lib/errors.mjs';
import { getPayment } from '../controllers/payment';

const router = express.Router();
const logger = getLogger('routes/transactions');

logger.verbose('adding /transactions routes...');

router.get('/', catchErrors(getPayment));

logger.verbose('added /transactions routes');

export default router;
