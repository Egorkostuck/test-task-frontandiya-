import { FC, ReactNode } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

import {
  STATUS_CODE_401,
  STATUS_CODE_404,
  STATUS_CODE_500,
} from '../../constants/errorConstants';

import SvgSprite from 'components/shared/SvgSprite';

import 'styles/components/default-window.scss';

interface Props {
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const defaultText = 'Start with searching a GitHub user';
const sizeIcon = 70;

const DefaultWindow: FC<Props> = ({ isLoading = false, error }) => {
  const getErrorMessage = (): Nullable<ReactNode> => {
    if (!error && isLoading) {
      return null;
    }

    if (error && 'status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

      switch (error.status) {
        case STATUS_CODE_401:
          return <h3 className="default-window__text">Unauthorized</h3>;
        case STATUS_CODE_404:
          return <h3 className="default-window__text">Not Found</h3>;
        case STATUS_CODE_500:
          return <h3 className="default-window__text">Internal Server Error</h3>;
        default:
          break;
      }

      return <h3 className="default-window__text">{errMsg}</h3>;
    }

    return <h3 className="default-window__text">{error?.message}</h3>;
  };

  return (
    <div className="default-window">
      <div className="default-window__container">
        {isLoading && <div className="default-window__loader" />}

        {getErrorMessage()}

        {!(isLoading || error) && (
          <>
            <SvgSprite id="icon-search" size={[sizeIcon, sizeIcon]} color="#808080" />
            <h3 className="default-window__text">{defaultText}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default DefaultWindow;
