// Convert the supplied Google Books response into a consistent shape for the UI.
function toHttps(url = '') {
  return url.replace(/^http:\/\//, 'https://');
}

export function mapGoogleBook(item) {
  const info = item?.volumeInfo || {};
  const access = item?.accessInfo || {};
  const sale = item?.saleInfo || {};

  return {
    id: item?.id || 'unknown-book',
    title: info.title || 'Untitled book',
    subtitle: info.subtitle || '',
    authors: Array.isArray(info.authors) ? info.authors : [],
    publisher: info.publisher || 'Publisher not available',
    publishedDate: info.publishedDate || 'Date not available',
    description: info.description || '',
    categories: Array.isArray(info.categories) ? info.categories : [],
    pageCount: Number.isFinite(info.pageCount) ? info.pageCount : null,
    language: info.language || '',
    thumbnail: toHttps(info.imageLinks?.thumbnail || ''),
    previewLink: toHttps(info.previewLink || access.webReaderLink || ''),
    infoLink: toHttps(info.infoLink || info.canonicalVolumeLink || ''),
    pdfAvailable: access.pdf?.isAvailable === true,
    buyLink: toHttps(sale.buyLink || ''),
    price: sale.retailPrice || null,
  };
}
