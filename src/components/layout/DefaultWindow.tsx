import { FC, ReactNode } from 'react';

import SvgSprite from 'components/shared/SvgSprite';
import 'styles/components/default-window.scss';

interface Data {
  message: string;
  documentation_url: string;
}

interface Error {
  data: Data;
  status: number;
}

interface Props {
  loading: boolean;
  error?: Error;
}
const DefaultWindow: FC<Props> = props => {
  const { loading = false, error } = props;

  const sizeIcon = 70;
  const defaultText = 'Start with searching a GitHub user';

  const getLoader = (): ReactNode | null => {
    if (loading) {
      return <div className="default-window__loader" />;
    }

    return null;
  };

  const getErrorMessage = (): ReactNode | null => {
    return error && loading === false ? (
      <h3 className="default-window__text">{error?.data?.message}</h3>
    ) : null;
  };

  const getContent = (): ReactNode | null => {
    if (loading || error) {
      return null;
    }

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

        {getErrorMessage()}

        {getContent()}
      </div>
    </div>
  );
};

export default DefaultWindow;
