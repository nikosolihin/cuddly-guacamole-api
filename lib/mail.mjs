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
      relativeTo: path.join(path.resolve(), 'emails'),
    },
  },
});

/**
 * Send an email
 */
export const sendEmail = async (to, subject, template, data) => {
  const html = await email.render(template, { ...data }).then(v => v);
  const message = {
    to,
    html,
    subject,
    from: process.env.CONFIRMATION_FROM,
    bcc: process.env.CONFIRMATION_BCC,
  };
  return await mailgun
    .messages()
    .send(message)
    .then(() => logger.verbose('Email sent to %s', to), () => logger.verbose('Failed sending email to %s', to));
};
