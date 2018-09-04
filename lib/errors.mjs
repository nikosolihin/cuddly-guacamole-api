import createError from 'http-errors';
import getLogger from './lib/logger.mjs';

const logger = getLogger('errors');

/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
*/
export const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

/*
  Not Found Error Handler
*/
export const notFound = (err, req, res, next) => {
  logger.error('Not Found');
  logger.error(err);
  next(createError(404));
};

/*
  Development Error Hanlder
*/
export const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };
  logger.error(err.status || 500);
  logger.error(err.message);
  res.status(err.status || 500).json(errorDetails);
};

/*
  Production Error Hanlder
*/
export const productionErrors = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    status: err.status,
  };
  logger.error(err.status || 500);
  logger.error(err.message);
  res.status(err.status || 500).json(errorDetails);
};
