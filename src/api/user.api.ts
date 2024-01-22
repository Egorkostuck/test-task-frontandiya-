import { api } from 'api/Api';
import { Repo } from 'components/layout/Repositories';
import { GitHubUser } from 'components/shared/InputSearch';

interface RepoParams {
  login: string;
  page: number;
}

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getUserByLogin: build.query<GitHubUser, string>({
      query: login => `users/${login}`,
    }),
    getReposByLogin: build.query<Repo[], RepoParams>({
      query: params => {
        return `users/${params.login}/repos?per_page=4&page=${params.page + 1}`;
      },
    }),
  }),
});

export const { useGetUserByLoginQuery, useGetReposByLoginQuery } = userApi;
