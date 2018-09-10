import express from 'express';
// import jwksRsa from 'jwks-rsa';
// import jwt from 'express-jwt';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound, developmentErrors, productionErrors } from './lib/errors';
import paymentRoutes from './routes/payment';
import newsletterRoutes from './routes/newsletter';

const app = express();

// const requireValidJWT = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
// app.use(requireValidJWT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/payment', paymentRoutes);
app.use('/newsletter', newsletterRoutes);

// catch 404 for routes not found
app.use(notFound);

if (app.get('env') === 'development') {
  // development error
  app.use(developmentErrors);
} else {
  // production error
  app.use(productionErrors);
}

export default app;
