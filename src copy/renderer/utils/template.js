const getLabelFromId = id => {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTemplateIdFromLabel = (templates, label) => {
  const found = templates.find(t => t.label === label);
  return found?.id;
};

const getIdFromLabel = label => {
  return label.toLowerCase().replace(/\s/g, '-');
};

const serialize = (label, templates) => {
  const newLabel = label.replace('*', '');
  const serialized = templates.reduce((state, ele) => {
    if (ele.label.startsWith(newLabel)) {
      const eleVal = ele.label.match(/\(\d*\)$/) || 0;
      if (eleVal === 0) return state;

      const eleNum = Number(eleVal[0].replace(/\(|\)/g, ''));
      const newVal = Number(state.match(/\(\d*\)/)[0].replace(/\(|\)/g, ''));

      if (newVal <= eleNum) return `${newLabel} (${eleNum + 1})`;

      return state;
    }

    return state;
  }, `${newLabel} (1)`);

  return serialized;
};

export { serialize, getLabelFromId, getTemplateIdFromLabel, getIdFromLabel };
