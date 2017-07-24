export const parse = html => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
};

export const getBookId = url => url.split('/').slice(-1)[0].split('?')[0].toUpperCase();

export const getPageCount = doc => {
  const pageElement = Array.from(doc.querySelectorAll('.adbl-page-link')).pop();
  return pageElement ? parseInt(pageElement.innerText) : 1;
};