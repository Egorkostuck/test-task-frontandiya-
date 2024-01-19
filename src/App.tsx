import { FC, ReactNode, useMemo, useState } from 'react';

import { useGetReposByLoginQuery, useGetUserByLoginQuery } from 'api/user.api';
import DefaultWindow from 'components/layout/DefaultWindow';
import Header from 'components/layout/Header';
import Profile from 'components/layout/Profile';
import Repositories from 'components/layout/Repositories';
import Container from 'components/shared/Container';

import 'styles/components/app.scss';

const App: FC = () => {
  const [searchProfile, setSearchProfile] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const user = useGetUserByLoginQuery(searchProfile, {
    skip: !searchProfile,
  });

  const repos = useGetReposByLoginQuery(
    {
      login: searchProfile,
      page: currentPage,
    },
    { skip: !searchProfile },
  );

  const {
    currentData: userData,
    isFetching: isFetchingUser,
    error: errorUser,
    isError: isErrorUser,
  } = user;

  const {
    currentData: reposData,
    isFetching: isFetchingRepos,
    error: errorRepos,
    isError: isErrorRepos,
  } = repos;

  const changePage = (page: number): void => {
    return setCurrentPage(page);
  };

  const getRepositories = (): ReactNode | null => {
    const repositories = reposData ?? null;
    const totalRepos = userData?.public_repos ?? 0;

    if (repositories) {
      return (
        <Repositories
          changePage={changePage}
          repositories={repositories}
          currentPage={currentPage}
          totalRepos={totalRepos}
        />
      );
    }

    return null;
  };

  const getContent = (): ReactNode | null => {
    if (!userData) {
      return <DefaultWindow loading={isLoading} error={error} />;
    }

    return (
      <div className="app__content">
        <Container>
          <div className="app__info-container">
            {userData && <Profile user={userData} />}

            {getRepositories()}
          </div>
        </Container>
      </div>
    );
  };
  const handleSearchInputChange = (value: string): void => {
    setSearchProfile(value);
    setCurrentPage(1);
  };

  useMemo(() => {
    if (isFetchingUser || isFetchingRepos) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (isErrorUser || isErrorRepos) {
      // @ts-ignore
      return isErrorUser ? setError(errorUser) : setError(errorRepos);
    }

    return null;
  }, [isFetchingUser, isFetchingRepos, isErrorUser, isErrorRepos]);

  return (
    <div className="app">
      <Header onSearchInputChange={handleSearchInputChange} />

      <main>{getContent()}</main>
    </div>
  );
};

export default App;
