import getLogger from './logger.mjs';
import wp from './wordpress.mjs';

const logger = getLogger('lib/transactions');

export const getStuff = async slug => {
  logger.verbose('Getting stuff with slug %s', slug);
  // const { data: { total_count = 0 } = {} }
  const response = await wp
    .pages()
    .slug(slug)
    .then(res => res);
  return response;
};
