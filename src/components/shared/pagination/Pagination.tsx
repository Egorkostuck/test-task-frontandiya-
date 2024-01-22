import { FC } from 'react';

import ReactPaginate from 'react-paginate';

import { getMaxPages, getPaginationInfo } from 'helpers/paginationHelpers';

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
  const handleChangePage = (selectedItem: { selected: number }): void => {
    changePage(selectedItem.selected);
  };

  return (
    <div className="pagination">
      <span className="pagination__info">
        {getPaginationInfo(itemsPerPage, currentPage, countItems)}
      </span>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handleChangePage}
        pageRangeDisplayed={3}
        pageCount={getMaxPages(countItems, itemsPerPage)}
        previousLabel="<"
        renderOnZeroPageCount={null}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PaginationApp;
