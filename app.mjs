import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { notFound, developmentErrors, productionErrors } from './lib/errors';
import paymentRoutes from './routes/payment';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/payment', paymentRoutes);

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
