import getLogger from './lib/logger.mjs';

const logger = getLogger('server');
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

export const startServer = app => {
  app.listen(port, () => {
    logger.info(`Started the server at http://%s:%d`, host, port);
  });
};
