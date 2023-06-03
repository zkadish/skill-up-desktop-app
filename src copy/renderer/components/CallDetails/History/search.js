/* eslint-disable import/prefer-default-export */

const searchHTML = (HTML, key) => {
  const searchKey = key.trim();
  const searchRegex = new RegExp(searchKey, 'g');

  const textNodes = HTML.querySelectorAll('.text');

  textNodes.forEach(n => {
    const node = n;
    // replace the innerHTML with the text of the node every time
    const { textContent } = node;
    if (searchKey === '') {
      node.innerHTML = textContent;
      return;
    }

    const iterable = textContent.matchAll(searchRegex);
    const matches = Array.from(iterable);

    let result = textContent;
    matches.forEach((match, i) => {
      const span = document.createElement('span');
      span.style.cssText = 'background: lightblue';
      span.innerHTML = `${match[0]}`;

      const l = (span.outerHTML.length - 1) * i;
      const start = result.slice(0, match.index + l);
      const end = result.slice(match.index + match[0].length + l);
      result = `${start}${span.outerHTML}${end}`;
    });

    node.innerHTML = result;
  });
};

export { searchHTML };
