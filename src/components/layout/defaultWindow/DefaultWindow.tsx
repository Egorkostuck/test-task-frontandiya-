import { FC } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

import { sizeIcon, defaultText } from 'components/layout/defaultWindow/config';
import ErrorMessage from 'components/shared/errorMessage/ErrorMessage';
import SvgSprite from 'components/shared/svgSprite/SvgSprite';

import 'styles/components/default-window.scss';

interface Props {
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const DefaultWindow: FC<Props> = ({ isLoading = false, error }) => {
  return (
    <div className="default-window">
      <div className="default-window__container">
        {isLoading && <div className="default-window__loader" />}

        {error && <ErrorMessage isLoading={isLoading} error={error} />}

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
