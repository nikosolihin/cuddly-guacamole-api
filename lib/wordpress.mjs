import wpApi from 'wpapi';
import getLogger from './logger';

const logger = getLogger('lib/wordpress');

const wpNamespace = process.env.WP_NAMESPACE;
// const acfNamespace = process.env.WP_NAMESPACE_ACF;
const wpOptions = {
  endpoint: process.env.WP_HOST,
  username: process.env.WP_USER,
  password: process.env.WP_PASS,
};
const wp = new wpApi(wpOptions);

global.wp = wp;

/**
 * Register Transaction CPT routes
 */
logger.verbose('registering transaction CPT...');
wp.transactions = wp.registerRoute(wpNamespace, '/transactions/(?P<id>\\d+)', {
  params: ['cuid'],
});

export default wp;
