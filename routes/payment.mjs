import express from 'express';
import getLogger from '../lib/logger.mjs';
import { catchErrors } from '../lib/errors.mjs';
import { checkBody, getPayment } from '../controllers/payment';

const router = express.Router();
const logger = getLogger('routes/payment');

logger.verbose('adding /payment routes...');

router.post('/card/charge', checkBody, catchErrors(getPayment));

logger.verbose('added /payment routes');

export default router;
