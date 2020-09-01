export const parse = html => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
};

export const
  getPageCount = doc => {
    const pageElement = Array.from(doc.querySelectorAll('.pageNumberElement')).pop();
    return pageElement ? parseInt(pageElement.innerText) : 1;
  };