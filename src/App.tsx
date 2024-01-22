import { FC, ReactNode, useState } from 'react';

import { useGetReposByLoginQuery, useGetUserByLoginQuery } from 'api/user.api';
import DefaultWindow from 'components/layout/DefaultWindow';
import Header from 'components/layout/Header';
import Profile from 'components/layout/Profile';
import Repositories from 'components/layout/Repositories';
import Container from 'components/shared/Container';
import 'styles/components/app.scss';

const App: FC = () => {
  const [searchProfile, setSearchProfile] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const {
    currentData: userData,
    isFetching: isFetchingUser,
    error: errorUser,
  } = useGetUserByLoginQuery(searchProfile, {
    skip: !searchProfile,
  });

  const {
    currentData: reposData,
    isFetching: isFetchingRepos,
    error: errorRepos,
  } = useGetReposByLoginQuery(
    {
      login: searchProfile,
      page: currentPage,
    },
    { skip: !searchProfile },
  );

  const changePage = (page: number): void => {
    return setCurrentPage(page);
  };

  const getContent = (): Nullable<ReactNode> => {
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
  const handleSearchInputChange = (value: string): void => {
    setSearchProfile(value);
    setCurrentPage(0);
  };

  return (
    <div className="app">
      <Header onSearchInputChange={handleSearchInputChange} />

      <main>{getContent()}</main>
    </div>
  );
};

export default App;
