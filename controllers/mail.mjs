import createError from 'http-errors';
import getLogger from '../lib/logger';
import { chargeCard } from '../lib/xendit';

const logger = getLogger('controllers/payment');

/**
 * Send an email
 */
export const sendEmail = async (req, res, next) => {};
