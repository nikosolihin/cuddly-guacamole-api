import path from 'path';
import Email from 'email-templates';
import Mailgun from 'mailgun-js';
import getLogger from '../lib/logger';

const logger = getLogger('lib/mail');

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const email = new Email({
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(path.resolve(), '..', 'emails'),
    },
  },
});

/**
 * Send an email
 */
export const send = (isSuccess, locals) => {
  const template = isSuccess ? 'success' : 'failed';
  const subject = isSuccess ? process.env.CONFIRMATION_SUCCESS : process.env.CONFIRMATION_FAILED;

  const html = email
    .render(template, { ...locals })
    .then(v => v)
    .catch(console.error);

  const data = {
    from: process.env.CONFIRMATION_FROM,
    to: 'nikosolihin@gmail.com',
    bcc: process.env.CONFIRMATION_BCC,
    subject,
    html,
  };

  return mailgun
    .messages()
    .send(data)
    .then(v => logger.verbose('Responded with a confirmation email to %s', 'nikosolihin@gmail.com'));
};

/**
 * TODO: Test trx failure email
 */
