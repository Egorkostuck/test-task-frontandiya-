import { FC, JSX } from 'react';

import { useSelector } from 'react-redux';

import SvgSprite from '../shared/SvgSprite';
import '../../styles/components/default-window.scss';

const DefaultWindow: FC = (): JSX.Element => {
  const { user, error, loading } = useSelector((state: any) => state.user);
  const sizeIcon: number = 70;
  const defaultText: string = 'Start with searching a GitHub user';

  const getLoader = (): JSX.Element => {
    return loading && <div className="default-window__loader" />;
  };

  const getContent = (): JSX.Element | undefined => {
    if (loading) return;

    if (error !== null) return <h3 className="default-window__text">{user.message}</h3>;

    return (
      <>
        <SvgSprite id="icon-search" size={[sizeIcon, sizeIcon]} color="#808080" />
        <h3 className="default-window__text">{defaultText}</h3>
      </>
    );
  };

  return (
    <div className="default-window">
      <div className="default-window__container">
        {getLoader()}

        {getContent()}
      </div>
    </div>
  );
};

export default DefaultWindow;
