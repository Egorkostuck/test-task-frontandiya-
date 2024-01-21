import { FC } from 'react';

import 'styles/components/repocards.scss';

interface Props {
  name: string;
  description: string;
  url: string;
}

const RepoCards: FC<Props> = ({ name, description, url }) => {
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
