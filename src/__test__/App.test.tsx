import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import { searchUsers, getUserRepos } from '../services';

// Mock the GitHub service
vi.mock('../services');

const mockUser = {
  login: 'testuser',
  id: 1,
  avatar_url: 'https://example.com/avatar.jpg',
};

const mockRepos = [
  {
    id: 1,
    name: 'test-repo',
    description: 'Test repository',
    stargazers_count: 100,
    html_url: 'https://github.com/testuser/test-repo',
    language: 'TypeScript',
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderApp = () => {
  render(<App />, { wrapper: createWrapper() });
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input and button only', () => {
    renderApp();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('clear the search input when the clear button is clicked', async () => {
    renderApp();
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, mockUser.login);

    const button = screen.getByTestId('clear-button');
    fireEvent.click(button);

    expect(input).toHaveValue('');
  });

  it('searches for users when the search button is clicked', async () => {
    const mockSearchUsers = vi.mocked(searchUsers);
    mockSearchUsers.mockResolvedValueOnce([mockUser]);

    renderApp();

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, mockUser.login);
    fireEvent.click(button);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSearchUsers).toHaveBeenCalledWith(mockUser.login, 5);
      const userCard = screen.getByTestId('user-card');
      expect(userCard).toBeInTheDocument();
      const userName = screen.getByRole('heading', { level: 3 });
      expect(userName).toBeInTheDocument();
      expect(userName).toHaveTextContent(mockUser.login);
    });
  });

  it('displays user repositories when a user card is clicked', async () => {
    const mockSearchUsers = vi.mocked(searchUsers);
    const mockGetUserRepos = vi.mocked(getUserRepos);

    mockSearchUsers.mockResolvedValueOnce([mockUser]);
    mockGetUserRepos.mockResolvedValueOnce(mockRepos);

    renderApp();

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, mockUser.login);
    fireEvent.click(button);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('user-card')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('user-card'));

    await waitFor(() => {
      expect(mockGetUserRepos).toHaveBeenCalledWith(mockUser.login);
      expect(screen.getByTestId('repo-list')).toBeInTheDocument();
      expect(screen.getByText(mockRepos[0].name)).toBeInTheDocument();
    });
  });

  it('displays empty repositories when a user card is clicked', async () => {
    const mockSearchUsers = vi.mocked(searchUsers);
    const mockGetUserRepos = vi.mocked(getUserRepos);

    mockSearchUsers.mockResolvedValueOnce([mockUser]);
    mockGetUserRepos.mockResolvedValueOnce([]);

    renderApp();

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, mockUser.login);
    fireEvent.click(button);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('user-card')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('user-card'));

    await waitFor(() => {
      expect(mockGetUserRepos).toHaveBeenCalledWith(mockUser.login);
      expect(screen.getByTestId('repo-list')).toBeInTheDocument();
      expect(screen.queryByText(mockRepos[0].name)).not.toBeInTheDocument();
      expect(screen.getByText('No Repositories Found')).toBeInTheDocument();
    });
  });

  it('displays an error message when the API call fails', async () => {
    const mockSearchUsers = vi.mocked(searchUsers);
    mockSearchUsers.mockRejectedValueOnce(new Error('API Error'));

    renderApp();

    await userEvent.type(screen.getByTestId('search-input'), mockUser.login);
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.queryByText('No Users Found')).not.toBeInTheDocument();
    });
  });
});
