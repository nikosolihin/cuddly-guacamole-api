import createError from 'http-errors';
import getLogger from './logger.mjs';

const logger = getLogger('errors');

/**
 * Catch Error handler
 * With async/await, you need some way to
 * catch errors.
 */
export const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

/**
 * Not found Error handler
 */
export const notFound = (err, req, res, next) => {
  logger.error('Not Found');
  logger.error(err);
  next(createError(404));
};

/**
 * Development Error handler
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

/**
 * Production Error handler
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

/**
 * Event listener for HTTP server "error" event
 */
export const onHttpError = error => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  let msg = '';

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      msg = `${bind} requires elevated privileges`;
      console.error(msg);
      logger.error(msg);
      logger.error(err);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      msg = `${bind} is already in use`;
      console.error(msg);
      logger.error(msg);
      logger.error(err);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server
 * "listening" event
 */
export const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};