import wpApi from 'wpapi';

const wpNamespace = process.env.WP_NAMESPACE;
const acfNamespace = process.env.WP_NAMESPACE_ACF;
const wpOptions = {
  endpoint: process.env.WP_HOST,
  username: process.env.WP_USER,
  password: process.env.WP_PASS,
};
const wp = new wpApi(wpOptions);

/**
 * Register Transaction CPT routes
 */
wp.transactions = wp.registerRoute(wpNamespace, '/transactions/(?P<id>\\d+)', {
  params: ['cuid', 'bill', 'donor'],
});

export default wp;
