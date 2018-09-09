import express from 'express';
import getLogger from '../lib/logger';
import { wrapAsync } from '../lib/errors';
import { checkBody, createCharge } from '../controllers/payment';

const router = express.Router();
const logger = getLogger('routes/payment');

logger.verbose('adding /payment routes...');

// checkbody, write to wp as initiated, createCharge, write status to wp

router.post('/card/charge', checkBody, wrapAsync(createCharge));
// router.post('/card/recur', checkBody, catchErrors(createCharge));

logger.verbose('added /payment routes');

export default router;
