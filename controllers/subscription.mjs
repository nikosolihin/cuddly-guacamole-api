import getLogger from '../lib/logger';
import { subscribe, checkSubscription } from '../lib/mailchimp';

const logger = getLogger('controllers/subcription');

/**
 * Subscribe donor into the mailing list
 */
export const upsertDonor = async (req, res, next) => {
  const { email, first, last, phone } = req.body;
  const subscriber = await checkSubscription(email);
  const isSubscriber = subscriber.status !== 404;
  logger.verbose(`%s %s already in the list`, email, isSubscriber ? 'is' : 'is not');
  if (isSubscriber) {
    // lets handle this in the error handler
    res.status(200).json({
      error: `${email} is already in the mailing list`,
    });
    return;
  } else {
    const donor = await subscribe(email, first, last, phone);
    res.status(200).json(donor);
  }
};
