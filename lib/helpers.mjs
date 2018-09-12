import ise from 'lodash.isempty';

export const isEmpty = (...values) => values.some(val => ise(val));

export const formatAmount = amount => `Rp ${(amount / 1000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
