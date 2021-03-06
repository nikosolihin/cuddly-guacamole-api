import getLogger from './lib/logger';

const logger = getLogger('server');
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

export default app => {
  app.listen(port, () => {
    logger.info(`Started the server at http://%s:%d`, host, port);
  });
};
