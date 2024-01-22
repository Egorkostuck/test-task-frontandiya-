import { FC } from 'react';

import PaginationApp from 'components/shared/Pagination';
import RepoCards from 'components/shared/RepoCards';

import 'styles/components/repositories.scss';

export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  [key: string]: unknown;
};

interface Props {
  handleChangePage: (page: number) => void;
  repositories: Repo[];
  currentPage: number;
  totalRepos: number;
}

const itemsPerPage = 4;

const Repositories: FC<Props> = ({
  handleChangePage,
  repositories,
  currentPage,
  totalRepos,
}) => {
  return (
    <div className="repositories">
      <div className="repositories__content">
        <h3 className="repositories__title">{`Repositories (${totalRepos})`}</h3>

        <div className="cards__container">
          {repositories.length &&
            repositories.map((repo: Repo) => {
              return (
                <RepoCards
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                  url={repo.html_url}
                />
              );
            })}
        </div>

        {repositories.length && (
          <PaginationApp
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            countItems={totalRepos}
            changePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default Repositories;
