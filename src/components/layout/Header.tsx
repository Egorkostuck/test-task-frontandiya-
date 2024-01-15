import { JSX } from 'react';

import InputSearch from '../shared/InputSearch';
import SvgSprite from '../shared/SvgSprite';
import '../../styles/components/header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <SvgSprite id="logo-git" size={['48', '48']} color="#fff" />
          </div>

          <div className="header__search">
            <InputSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
