import { FC, JSX } from 'react';

import '../../styles/common/_base.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Container: FC<Props> = (props: Props): JSX.Element => {
  const { children } = props;

  return <div className="container">{children}</div>;
};

export default Container;
