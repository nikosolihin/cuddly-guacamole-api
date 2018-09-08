import app from './app.mjs';
import { startServer } from './server.mjs';
import { onHttpError, onListening } from './lib/errors.mjs';
import getLogger from './lib/logger.mjs';

const logger = getLogger('index');

startServer(app);

//  https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', (error, p) => {
  // logger.error('unhandledRejection');
  console.log(error);
  console.log('-----------------------------');
  console.log(p);
  // logger.error(error);
});

// https://nodejs.org/api/net.html#net_event_error
app.on('error', onHttpError);

// https://nodejs.org/api/net.html#net_event_listening
app.on('listening', onListening);
