import app from './app.mjs';
import { startServer } from './server.mjs';
import getLogger from './lib/logger.mjs';

const logger = getLogger('index');

startServer(app);

//  https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', error => {
  logger.error('unhandledRejection');
  logger.error(error);
});

// https://nodejs.org/api/net.html#net_event_error
app.on('error', onError);

// https://nodejs.org/api/net.html#net_event_listening
app.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

// function onError(error) {
//     if (error.syscall !== 'listen') {
//       throw error;
//     }

//     var bind = typeof port === 'string'
//       ? 'Pipe ' + port
//       : 'Port ' + port;

//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//       case 'EACCES':
//         console.error(bind + ' requires elevated privileges');
//         process.exit(1);
//         break;
//       case 'EADDRINUSE':
//         console.error(bind + ' is already in use');
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   }

/**
 * Event listener for HTTP server "listening" event.
 */

//   function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string'
//       ? 'pipe ' + addr
//       : 'port ' + addr.port;
//     debug('Listening on ' + bind);
//   }
