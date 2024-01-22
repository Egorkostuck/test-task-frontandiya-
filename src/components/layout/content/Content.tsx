import { FC } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

import DefaultWindow from 'components/layout/defaultWindow/DefaultWindow';
import Profile from 'components/layout/profile/Profile';
import Container from 'components/shared/container/Container';
import { GitHubUser } from 'components/shared/inputSearch/types';
import Repositories from 'components/shared/repositories/Repositories';
import { Repo } from 'components/shared/repositories/type';

interface Props {
  errorUser?: FetchBaseQueryError | SerializedError;
  errorRepos?: FetchBaseQueryError | SerializedError;
  isFetchingUser: boolean;
  isFetchingRepos: boolean;
  reposData?: Repo[];
  userData?: GitHubUser;
  changePage: (page: number) => void;
  currentPage: number;
}

const Content: FC<Props> = ({
  errorUser,
  errorRepos,
  isFetchingUser,
  isFetchingRepos,
  reposData,
  userData,
  changePage,
  currentPage,
}) => {
  const error = errorUser || errorRepos;
  const isLoading = isFetchingUser && isFetchingRepos;
  const repositories = reposData ?? null;
  const totalRepos = userData?.public_repos ?? 0;

  if (!userData) {
    return <DefaultWindow isLoading={isLoading} error={error} />;
  }

  return (
    <div className="app__content">
      <Container>
        <div className="app__info-container">
          {userData && <Profile user={userData} />}

          {repositories && (
            <Repositories
              handleChangePage={changePage}
              repositories={repositories}
              currentPage={currentPage}
              totalRepos={totalRepos}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Content;
