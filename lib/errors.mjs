import createError from 'http-errors';
import getLogger from './logger';

const logger = getLogger('errors');

/**
 * Catch async exceptions and pass to next(err)
 */
export const wrapAsync = fn => (req, res, next) => fn(req, res, next).catch(next);

/**
 * Not found Error handler
 * Omit the err param since this is not yet an error handler
 */
export const notFound = (req, res, next) => {
  next(createError(404));
};

/**
 * Development Error handler
 */
export const developmentErrors = (err, req, res, next) => {
  const { stack = '', response = {}, status, message } = err;
  const { status: resStatus, data } = response;
  const errStatus = resStatus || status || 500;
  res.status(errStatus).json({
    status: errStatus,
    message,
    ...(data && { data }),
    stackHighlighted: stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  });
};

/**
 * Production Error handler
 */
export const productionErrors = (err, req, res, next) => {
  const { response = {}, status, message } = err;
  const { status: resStatus, data } = response;
  const errStatus = resStatus || status || 500;
  res.status(errStatus).json({
    status: errStatus,
    message,
    ...(data && { data }),
  });
};
