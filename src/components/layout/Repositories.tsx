import { FC, JSX } from 'react';

import { useSelector } from 'react-redux';

import PaginationApp from '../shared/Pagination';
import RepoCards from '../shared/RepoCards';

import '../../styles/components/repositories.scss';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Repositories: FC = (): JSX.Element => {
  const { user, repositories, currentPage } = useSelector((state: any) => state.user);
  const itemsPerPage: number = 4;

  const getRepoItems = (): JSX.Element | undefined => {
    if (!repositories.length) return;

    return (
      <>
        {repositories.map((repo: Repo) => {
          return (
            <RepoCards
              key={repo.id}
              name={repo.name}
              description={repo.description}
              url={repo.html_url}
            />
          );
        })}
      </>
    );
  };

  const getPagination = (): JSX.Element | undefined => {
    if (!repositories.length) return;

    return (
      <PaginationApp
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        countItems={user.public_repos}
      />
    );
  };

  return (
    <div className="repositories">
      <div className="repositories__content">
        <h3 className="repositories__title">{`Repositories (${user.public_repos})`}</h3>

        <div className="cards__container">{getRepoItems()}</div>

        {getPagination()}
      </div>
    </div>
  );
};

export default Repositories;
