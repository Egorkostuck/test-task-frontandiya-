import { FC, JSX, SetStateAction, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Logger from '../../helpers/logger';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserReposRequest,
  fetchUserReposSuccess,
  clearUserData,
} from '../../store/user/userData.slice';

import '../../styles/components/input-search.scss';

export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  html_url: string;
  repos_url: string;
  [key: string]: unknown;
}

const InputSearch: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [searchProfile, setSearchProfile] = useState('');

  const accessToken: string = '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';
  const delay: number = 1000;

  const fetchRepos = async (url: string): Promise<void | null> => {
    if (!user) return;
    dispatch(fetchUserReposRequest());

    await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => dispatch(fetchUserReposSuccess(data)))
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
        Logger.printError(error);
      });
  };
  const fetchUser = async (): Promise<GitHubUser | null> => {
    dispatch(fetchUserRequest());

    await fetch(`https://api.github.com/users/${searchProfile}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchUserSuccess(data));
        fetchRepos(data.repos_url);
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
        Logger.printError(error);
      });

    return user;
  };

  useEffect(() => {
    const delayRequest = setTimeout(() => {
      if (searchProfile.trim() !== '') {
        fetchUser();
      } else {
        dispatch(clearUserData());
      }
    }, delay);

    return () => clearTimeout(delayRequest);
  }, [searchProfile, dispatch]);
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
