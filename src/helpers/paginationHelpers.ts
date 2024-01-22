export const getMaxPages = (countItems: number, itemsPerPage: number): number =>
  Math.ceil(countItems / itemsPerPage);

export const getFirstItemOnPage = (itemsPerPage: number, currentPage: number): number =>
  Math.ceil(itemsPerPage * (currentPage + 1) - (itemsPerPage - 1));

export const getLastItemOnPage = (
  itemsPerPage: number,
  currentPage: number,
  countItems: number,
): number => {
  let lastItemOnPage: number = Math.ceil(itemsPerPage * (currentPage + 1));

  if (lastItemOnPage > countItems) {
    lastItemOnPage = countItems;
  }

  return lastItemOnPage;
};

export const getPaginationInfo = (
  itemsPerPage: number,
  currentPage: number,
  countItems: number,
): string => {
  const firstItemOnPage = getFirstItemOnPage(itemsPerPage, currentPage);
  const lastItemOnPage = getLastItemOnPage(itemsPerPage, currentPage, countItems);

  return `${firstItemOnPage} - ${lastItemOnPage} of ${countItems}`;
};
