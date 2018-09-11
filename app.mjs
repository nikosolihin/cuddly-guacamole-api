import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { notFound, developmentErrors, productionErrors } from './lib/errors';
import { requireValidJWT } from './controllers';
import paymentRoutes from './routes/payment';
import newsletterRoutes from './routes/newsletter';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
app.use(requireValidJWT.unless({ path: ['/payment/email'] }));
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
