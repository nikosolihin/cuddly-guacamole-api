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
