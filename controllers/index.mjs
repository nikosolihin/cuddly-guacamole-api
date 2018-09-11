import createError from 'http-errors';
import jwksRsa from 'jwks-rsa';
import jwt from 'express-jwt';
import getLogger from '../lib/logger';

const logger = getLogger('controllers/index');

/**
 * Request body should not be empty
 */
export const checkBody = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const err = createError(400, 'Empty request body');
    logger.error(err);
    return next(err);
  }
  return next();
};

/**
 * Require JWT Token on some routes
 */
export const requireValidJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    handleSigningKeyError: (err, cb) => console.log('Signing Key Error'),
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_DOMAIN}/`,
  credentialsRequired: false,
  algorithms: ['RS256'],
});
