import createError from 'http-errors';
import app from './app';
import { startServer } from './server';
import { onHttpError, onListening } from './lib/errors';
import getLogger from './lib/logger';

const logger = getLogger('index');

startServer(app);

//  https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', error => {
  logger.error(createError('unhandledRejection Error'));
});

// https://nodejs.org/api/net.html#net_event_error
app.on('error', onHttpError);

// https://nodejs.org/api/net.html#net_event_listening
app.on('listening', onListening);
