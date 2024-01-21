import { FC, ReactNode } from 'react';

import PaginationApp from 'components/shared/Pagination';
import RepoCards from 'components/shared/RepoCards';

import 'styles/components/repositories.scss';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  [key: string]: unknown;
}

interface Props {
  changePage: (page: number) => void;
  repositories: Repo[];
  currentPage: number;
  totalRepos: number;
}

const Repositories: FC<Props> = ({
  changePage,
  repositories,
  currentPage,
  totalRepos,
}) => {
  const itemsPerPage = 4;

  const getRepoItems = (): Nullable<ReactNode> => {
    if (!repositories.length) {
      return null;
    }

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

  const getPagination = (): Nullable<ReactNode> => {
    if (!repositories.length) {
      return null;
    }

    return (
      <PaginationApp
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        countItems={totalRepos}
        changePage={changePage}
      />
    );
  };

  return (
    <div className="repositories">
      <div className="repositories__content">
        <h3 className="repositories__title">{`Repositories (${totalRepos})`}</h3>

        <div className="cards__container">{getRepoItems()}</div>

        {getPagination()}
      </div>
    </div>
  );
};

export default Repositories;
