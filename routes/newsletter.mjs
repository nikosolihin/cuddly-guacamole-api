import express from 'express';
import getLogger from '../lib/logger';
import { wrapAsync } from '../lib/errors';
import { checkBody } from '../controllers';
import { upsertDonor } from '../controllers/subscription';

const router = express.Router();
const logger = getLogger('routes/newsletter');

logger.verbose('adding /newsletter routes...');

router.post('/', checkBody, wrapAsync(upsertDonor));

logger.verbose('added /newsletter routes');

export default router;
