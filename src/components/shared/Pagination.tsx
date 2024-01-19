import { FC } from 'react';

import Pagination from '@mui/material/Pagination';

import 'styles/components/pagination.scss';

interface Props {
  itemsPerPage: number;
  currentPage: number;
  countItems: number;
  changePage: (page: number) => void;
}
const PaginationApp: FC<Props> = (props: Props) => {
  const { itemsPerPage, currentPage, countItems, changePage } = props;

  const getMaxPages: number = Math.ceil(countItems / itemsPerPage);

  const firstItemOnPage: number = Math.ceil(
    itemsPerPage * currentPage - (itemsPerPage - 1),
  );

  const getLastItemOnPage = (): number => {
    let lastItemOnPage: number = Math.ceil(itemsPerPage * currentPage);

    if (lastItemOnPage > countItems) {
      lastItemOnPage = countItems;
    }

    return lastItemOnPage;
  };

  const handleChange = (event: unknown, value: number): void => {
    changePage(value);
  };

  return (
    <div className="pagination">
      <span className="pagination__info">{`${firstItemOnPage} - ${getLastItemOnPage()} of ${countItems}`}</span>

      <Pagination
        count={getMaxPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        size="large"
      />
    </div>
  );
};

export default PaginationApp;
