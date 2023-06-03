/* eslint-disable import/prefer-default-export */

export const alphabetizeLabel = (a, b) => {
  const A = a.label.toUpperCase();
  const B = b.label.toUpperCase();
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};
