import { FC, SetStateAction, useState } from 'react';

import 'styles/components/input-search.scss';
import useDebounced from 'hooks/useDebounced';

export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  html_url: string;
  repos_url: string;
  public_repos: number;
  message?: string;
  [key: string]: unknown;
}

interface Props {
  onInputChange: (value: string) => void;
}

const InputSearch: FC<Props> = ({ onInputChange }) => {
  const [searchProfile, setSearchProfile] = useState('');
  const delay = 1000;

  useDebounced({
    callback: () => onInputChange(searchProfile),
    delay,
    dependencies: [searchProfile],
  });

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }): void => {
    setSearchProfile(e.target.value);
  };

  return (
    <input
      onChange={handleInputChange}
      className="input-search"
      placeholder="Enter GitHub username"
      maxLength={30}
    />
  );
};

export default InputSearch;
