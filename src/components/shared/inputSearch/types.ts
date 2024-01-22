export type GitHubUser = {
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
};
