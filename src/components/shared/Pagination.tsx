import { FC, JSX } from 'react';

import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';

import '../../styles/components/pagination.scss';
import { getRepoByLink } from '../../api/Api';
import {
  changeCurrentPage,
  fetchUserReposRequest,
  fetchUserReposSuccess,
} from '../../store/user/userData.slice';

interface Props {
  itemsPerPage: number;
  currentPage: number;
  countItems: number;
}
const PaginationApp: FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

  const { itemsPerPage, currentPage, countItems } = props;

  const getMaxPages: number = Math.ceil(countItems / itemsPerPage);

  const firstItemOnPage: number = Math.ceil(
    itemsPerPage * currentPage - (itemsPerPage - 1),
  );

  const getLastItemOnPage = (): number => {
    let lastItemOnPage: number = Math.ceil(itemsPerPage * currentPage);

    if (lastItemOnPage > countItems) lastItemOnPage = countItems;

    return lastItemOnPage;
  };

  const getNewRepos = async (url: string, currentPage: number): Promise<void | null> => {
    if (!user) return;
    dispatch(fetchUserReposRequest());

    const perPage: number = itemsPerPage;

    const response = await getRepoByLink({ url, currentPage, perPage });

    dispatch(fetchUserReposSuccess(response));
  };

  const handleChange = async (event: unknown, value: number): Promise<void> => {
    const url = user.repos_url;

    dispatch(changeCurrentPage(value));

    await getNewRepos(url, value);
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
