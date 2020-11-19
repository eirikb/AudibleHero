export const parse = (html: string) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
};

export const getPageCount = (doc: Document) => {
  const pageElement = Array.from(
    doc.querySelectorAll('.pageNumberElement')
  ).pop();
  return pageElement ? parseInt(pageElement.textContent || '') : 1;
};
