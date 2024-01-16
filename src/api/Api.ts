import { GitHubUser } from '../components/shared/InputSearch';
import Logger from '../helpers/logger';

interface ApiOptions {
  baseURL: string | undefined;
}

interface RequestParams {
  per_page: number;
  page: number;
}

enum Methods {
  get = 'GET',
}

interface RequestOptions {
  method?: Methods;
  params?: RequestParams;
  headers?: {
    Authorization: string;
  };
}

const accessToken: string | undefined = process.env.REACT_APP_GIT_HUB_YOUR_ACCESS_TOKEN;
const baseURL: string | undefined = process.env.REACT_APP_GIT_HUB_USER_API;

export function Api(options: ApiOptions): any {
  const { baseURL } = options;

  async function request(url: string, options: RequestOptions = {}): Promise<void> {
    const { params = {}, headers = {} } = options;

    const queryString: string = new URLSearchParams(params).toString();
    const fullURL = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(`${baseURL}${fullURL}`, {
      headers,
    });

    if (!response.ok) {
      Logger.printError(response.statusText);
    }

    return response.json();
  }

  function get(url: string, params?: RequestParams): Promise<void> {
    return request(url, {
      method: Methods.get,
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return {
    get,
  };
}

interface Props {
  login: string;
  currentPage: number;
  perPage: number;
}

export const getRepoByLink = async (props: Props): Promise<void | null> => {
  const { login, currentPage, perPage } = props;
  const url: string = `/users/${login}/repos`;

  if (!baseURL) return null;

  const api = Api({ baseURL });

  try {
    const response = await api.get(url, {
      per_page: perPage,
      page: currentPage,
    });

    const data = await response;

    return data;
  } catch (error) {
    Logger.printError(error);

    return null;
  }
};

export const getUserByName = async (name: string): Promise<GitHubUser | null> => {
  if (!baseURL) return null;

  const api = Api({ baseURL });

  try {
    const response = await api.get(`/users/${name}`);

    const data = await response;

    return data;
  } catch (error) {
    Logger.printError(error);

    return null;
  }
};
