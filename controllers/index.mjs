import createError from 'http-errors';
import getLogger from '../lib/logger';

const logger = getLogger('controllers/index');

/**
 * Request body should not be empty
 */
export const checkBody = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const err = createError(400, 'Empty request body');
    logger.error(err);
    return next(err);
  }
  return next();
};
