import express from 'express';
import getLogger from '../lib/logger';
import { catchErrors } from '../lib/errors';
import { checkBody, createCharge } from '../controllers/payment';

const router = express.Router();
const logger = getLogger('routes/payment');

logger.verbose('adding /payment routes...');

router.post('/card/charge', checkBody, catchErrors(createCharge));

logger.verbose('added /payment routes');

export default router;
