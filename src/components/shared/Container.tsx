import { FC, ReactNode } from 'react';

import 'styles/common/_base.scss';

interface Props {
  children: ReactNode | ReactNode[];
}
const Container: FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
