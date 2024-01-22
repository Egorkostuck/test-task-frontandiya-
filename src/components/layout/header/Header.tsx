import { FC } from 'react';

import InputSearch from 'components/shared/inputSearch/InputSearch';
import SvgSprite from 'components/shared/svgSprite/SvgSprite';
import 'styles/components/header.scss';

interface Props {
  onSearchInputChange: (value: string) => void;
}

const Header: FC<Props> = ({ onSearchInputChange }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <SvgSprite id="logo-git" size={['41', '41']} color="#fff" />
          </div>

          <div className="header__search">
            <InputSearch onInputChange={onSearchInputChange} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
