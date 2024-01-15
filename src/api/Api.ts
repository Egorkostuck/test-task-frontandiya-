import { GitHubUser } from '../components/shared/InputSearch';
import Logger from '../helpers/logger';

interface Props {
  url: string;
  currentPage: number;
  perPage: number;
}
export const getRepoByLink = async (props: Props): Promise<void | null> => {
  const { url, currentPage, perPage } = props;
  const accessToken: string =
    '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';

  try {
    const response = await fetch(`${url}?per_page=${perPage}&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      Logger.printError(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    Logger.printError(error);

    return null;
  }
};

export const getUserByName = async (name: string): Promise<GitHubUser | null> => {
  const accessToken: string =
    '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';

  try {
    const response = await fetch(`https://api.github.com/users/${name}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      Logger.printError(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    Logger.printError(error);

    return null;
  }
};
