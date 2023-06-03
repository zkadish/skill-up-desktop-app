/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

const uuid = () => {
  return uuidv4().toString().replace(/-/g, '');
};

const alphabetizeLabel = (a, b) => {
  const A = a.label.toUpperCase();
  const B = b.label.toUpperCase();
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const alphabetizeValue = (a, b) => {
  const A = a.value.toUpperCase();
  const B = b.value.toUpperCase();
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const alphabetizeText = (a, b) => {
  const A = a.text.toUpperCase();
  const B = b.text.toUpperCase();
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const addActive = (templates) => {
  const result = templates.map((t) => {
    const template = { ...t };
    template.active = false;
    delete template._id;

    const blocks = template.blocks.map((b) => {
      const block = { ...b };
      block.active = false;
      delete block._id;

      const elements = block.elements.map((e) => {
        const element = { ...e };
        element.active = false;
        delete element._id;

        return element;
      });

      block.elements = elements;
      return block;
    });

    template.blocks = blocks;
    return template;
  });

  return result;
};

export { uuid, alphabetizeLabel, alphabetizeValue, alphabetizeText, addActive };
