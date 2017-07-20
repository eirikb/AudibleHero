export const parse = html => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
};

export const getBookId = url => url.split('/').slice(-1)[0].split('?')[0].toUpperCase();