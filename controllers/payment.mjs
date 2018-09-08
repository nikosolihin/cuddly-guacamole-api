import getLogger from '../lib/logger.mjs';
import { getStuff } from '../lib/payment.mjs';

const logger = getLogger('controllers/payment');

/**
 * Get Stuff
 */
export const getPayment = async (req, res, next) => {
  logger.verbose('requesting stuff for @%s', username);
  logger.verbose(`@%s %s a contributor.`, username, contributor ? 'is' : 'is not');
  const response = await getStuff(user);
  return res.status(200).json({
    error: `Whoops! @${username} has not contributed to ${org} on GitHub.`,
  });
};
