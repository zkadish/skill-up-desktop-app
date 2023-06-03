/* eslint-disable import/prefer-default-export */

export const isEmpty = value => {
  return value.trim() === '';
};

export const removeListEle = (array, ele) => {
  const list = [...array]; // copy array, splice mutates original
  // if ele is undefined index === -1
  const index = list.findIndex(item => item.id === ele?.id);
  if (index >= 0) list.splice(index, 1);
  return list;
};

export const notUnique = (array, value, ele) => {
  // when editing a label, pass the ele being edited
  // so its not in the list to check if already exists
  const list = removeListEle(array, ele);
  return !list.some(item => item.label === value.trim());
};

const template = /^[a-z0-9-_.\s]*$/gi;
const talkTrackRegex = /^[a-z0-9()*@#!?$%,'";:/-_.\s]*$/gi;
export const isAllowedChar = (value, type) => {
  const isAllowed = /^[a-z0-9!@#$%&*()?,'";:/_.\-\s]*$/gi.test(value.trim());
  // debugger
  return isAllowed;
};
