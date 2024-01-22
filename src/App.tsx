import { FC, useState } from 'react';

import { useGetReposByLoginQuery, useGetUserByLoginQuery } from 'api/user.api';
import Content from 'components/layout/content/Content';
import Header from 'components/layout/header/Header';
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

  const handleSearchInputChange = (value: string): void => {
    setSearchProfile(value);
    setCurrentPage(0);
  };

  return (
    <div className="app">
      <Header onSearchInputChange={handleSearchInputChange} />

      <main>
        <Content
          errorUser={errorUser}
          errorRepos={errorRepos}
          isFetchingUser={isFetchingUser}
          isFetchingRepos={isFetchingRepos}
          reposData={reposData}
          userData={userData}
          changePage={changePage}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
};

export default App;
