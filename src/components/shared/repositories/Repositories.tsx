import { FC } from 'react';

import PaginationApp from 'components/shared/pagination/Pagination';
import RepoCards from 'components/shared/repoCards/RepoCards';
import { itemsPerPage } from 'components/shared/repositories/config';
import { Repo } from 'components/shared/repositories/type';

import 'styles/components/repositories.scss';

interface Props {
  handleChangePage: (page: number) => void;
  repositories: Repo[];
  currentPage: number;
  totalRepos: number;
}

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
