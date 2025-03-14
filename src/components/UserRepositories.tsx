import { IconBooksOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { FC, memo } from 'react';
import { getUserRepos } from '~/services';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import ReposityItem from './RepositoryItem';

interface UserRepositoriesProps {
  username: string;
}

const UserRepositories: FC<UserRepositoriesProps> = ({ username }) => {
  const {
    data,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['repositories', { username }],
    queryFn: () => getUserRepos(username),
  });

  return (
    <div data-testid="repo-list">
      <div className="flex flex-col divide-y divide-gray-300">
        {data?.map(repo => (
          <ReposityItem key={repo.id} repo={repo} />
        ))}
      </div>
      <Loader isLoading={isFetching} />
      {!isFetching && !data?.length && !isError && (
        <EmptyState Icon={IconBooksOff} title="No Repositories Found" />
      )}
      {isError && (
        <ErrorMessage message="Error repositories users. Please try again." />
      )}
    </div>
  );
};

export default memo(UserRepositories);
