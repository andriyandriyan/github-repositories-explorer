import axios from 'axios';
import { GitHubRepo, GitHubUser, GithubUserResponse } from './interfaces';

const token = import.meta.env.VITE_GITHUB_API_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export const searchUsers = async (query: string, perPage: number): Promise<GitHubUser[]> => {
  const params = {
    q: query,
    per_page: perPage,
  }
  const response = await api.get<GithubUserResponse>('search/users', { params });
  return response.data.items;
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await api.get<GitHubRepo[]>(`users/${username}/repos`);

  return response.data;
};
