import { FC } from 'react';

import 'styles/components/profile.scss';
import { GitHubUser } from 'components/shared/inputSearch/types';
import SvgSprite from 'components/shared/svgSprite/SvgSprite';

interface Props {
  user: GitHubUser;
}

const Profile: FC<Props> = ({ user }) => {
  if (user === null) {
    return <div>not profile</div>;
  }

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__image">
          <img
            src={user.avatar_url}
            alt={user.name}
            width={260}
            height={260}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="profile__info">
          <p className="name">{user.name}</p>
          <a href={user.html_url} className="nickname" target="_blank" rel="noreferrer">
            {user.login}
          </a>
          <div className="followers-container">
            <div className="followers">
              <SvgSprite id="icon-followers" size={['24', '24']} color="#808080" />

              <p>{`${user.followers} followers`}</p>
            </div>

            <div className="following">
              <SvgSprite id="icon-following" size={['24', '24']} color="#808080" />

              <p>{`${user.following} following`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
