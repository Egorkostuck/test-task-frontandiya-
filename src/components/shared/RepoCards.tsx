import { FC, JSX } from 'react';

import '../../styles/components/repocards.scss';

interface Props {
  name: string;
  description: string;
  url: string;
}
const RepoCards: FC<Props> = (props: Props): JSX.Element => {
  const { name, description, url } = props;

  return (
    <div className="card">
      <div className="card__wrapper">
        <a href={url} className="card__link" target="_blank" rel="noreferrer">
          {name}
        </a>

        {description ? <p className="card__description">{description}</p> : ''}
      </div>
    </div>
  );
};

export default RepoCards;
