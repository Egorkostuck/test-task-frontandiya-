import { FC, ReactNode } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

import SvgSprite from 'components/shared/SvgSprite';

import 'styles/components/default-window.scss';

interface Props {
  loading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const DefaultWindow: FC<Props> = ({ loading = false, error }) => {
  const sizeIcon = 70;
  const defaultText = 'Start with searching a GitHub user';

  const getLoader = (): Nullable<ReactNode> => {
    if (loading) {
      return <div className="default-window__loader" />;
    }

    return null;
  };

  const getErrorMessage = (): Nullable<ReactNode> => {
    const status = 404;

    if (error && !loading) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

        if (error.status === status) {
          return <h3 className="default-window__text">Not Found</h3>;
        }

        return <h3 className="default-window__text">{errMsg}</h3>;
      }

      return <h3 className="default-window__text">{error.message}</h3>;
    }

    return null;
  };

  const getContent = (): Nullable<ReactNode> => {
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
