import { FC, JSX, SetStateAction, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getRepoByLink, getUserByName } from '../../api/Api';
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
  public_repos: number;
  message?: string;
  [key: string]: unknown;
}

const InputSearch: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user, currentPage } = useSelector((state: any) => state.user);
  const [searchProfile, setSearchProfile] = useState('');

  const delay: number = 1000;
  const perPage: number = 4;

  const fetchRepos = async (url: string): Promise<void | null> => {
    dispatch(fetchUserReposRequest());

    const response = await getRepoByLink({ url, currentPage, perPage });

    dispatch(fetchUserReposSuccess(response));
  };
  const fetchUser = async (): Promise<GitHubUser | null> => {
    dispatch(fetchUserRequest());

    const response = await getUserByName(searchProfile);

    if (response?.message) {
      dispatch(fetchUserFailure(response.message));

      return null;
    }

    if (response) {
      dispatch(fetchUserSuccess(response));
      await fetchRepos(response.repos_url);
    }

    return user;
  };

  useEffect(() => {
    const delayRequest = setTimeout(async (): Promise<void> => {
      if (searchProfile.trim() !== '') {
        await fetchUser();
      } else {
        dispatch(clearUserData());
      }
    }, delay);

    return () => clearTimeout(delayRequest);
  }, [searchProfile]);
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
