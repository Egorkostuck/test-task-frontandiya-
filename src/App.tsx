import React, { JSX } from 'react';

import { useSelector } from 'react-redux';

import DefaultWindow from './components/layout/DefaultWindow';
import Header from './components/layout/Header';
import Profile from './components/layout/Profile';
import Repositories from './components/layout/Repositories';
import Container from './components/shared/Container';

import './styles/components/app.scss';

const App = (): JSX.Element => {
  const { user, loading, error } = useSelector((state: any) => state.user);

  const getContent = (): JSX.Element => {
    if (!!loading || user === null || error) {
      return <DefaultWindow />;
    }

    return (
      <div className="app__content">
        <Container>
          <div className="app__info-container">
            <Profile user={user} />
            <Repositories />
          </div>
        </Container>
      </div>
    );
  };

  return (
    <div className="app">
      <Header />

      <main>{getContent()}</main>
    </div>
  );
};

export default App;
