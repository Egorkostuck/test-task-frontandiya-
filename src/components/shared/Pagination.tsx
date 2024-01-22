import { FC } from 'react';

import ReactPaginate from 'react-paginate';

import 'styles/components/pagination.scss';

interface Props {
  itemsPerPage: number;
  currentPage: number;
  countItems: number;
  changePage: (page: number) => void;
}

const PaginationApp: FC<Props> = ({
  itemsPerPage,
  currentPage,
  countItems,
  changePage,
}) => {
  const getMaxPages: number = Math.ceil(countItems / itemsPerPage);

  const firstItemOnPage: number = Math.ceil(
    itemsPerPage * (currentPage + 1) - (itemsPerPage - 1),
  );

  const getLastItemOnPage = (): number => {
    let lastItemOnPage: number = Math.ceil(itemsPerPage * (currentPage + 1));

    if (lastItemOnPage > countItems) {
      lastItemOnPage = countItems;
    }

    return lastItemOnPage;
  };

  const handleChangePage = (selectedItem: { selected: number }): void => {
    changePage(selectedItem.selected);
  };

  return (
    <div className="pagination">
      <span className="pagination__info">{`${firstItemOnPage} - ${getLastItemOnPage()} of ${countItems}`}</span>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handleChangePage}
        pageRangeDisplayed={3}
        pageCount={getMaxPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PaginationApp;
