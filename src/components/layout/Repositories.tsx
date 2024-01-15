import { FC, JSX } from 'react';

import { useSelector } from 'react-redux';

import RepoCards from '../shared/RepoCards';

import '../../styles/components/repositories.scss';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Repositories: FC = (): JSX.Element => {
  const { repositories } = useSelector((state: any) => state.user);

  return (
    <div className="repositories">
      <div className="repositories__content">
        <h3 className="repositories__title">{`Repositories (${repositories.length})`}</h3>

        <div className="cards__container">
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
        </div>
      </div>
    </div>
  );
};

export default Repositories;
