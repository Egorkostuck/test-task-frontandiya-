import { FC } from 'react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit/react';

import { STATUS_CODE } from 'constants/errorConstants';

interface Props {
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
}

const ErrorMessage: FC<Props> = ({ error, isLoading }) => {
  if (!error && isLoading) {
    return null;
  }

  let errMsg = 'Error';

  if (error && 'status' in error) {
    errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    switch (error.status) {
      case STATUS_CODE.CODE_401:
        errMsg = 'Unauthorized';
        break;
      case STATUS_CODE.CODE_404:
        errMsg = 'Not Found';
        break;
      case STATUS_CODE.CODE_500:
        errMsg = 'Internal Server Error';
        break;
      default:
        break;
    }
  } else {
    errMsg = error?.message ?? 'Error';
  }

  return <h3 className="default-window__text">{errMsg}</h3>;
};

export default ErrorMessage;
