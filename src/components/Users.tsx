import { IconUserOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { FC, memo, useState } from 'react';
import { searchUsers } from '~/services';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import UserCard from './UserCard';

interface UsersProps {
  query: string;
}

const Users: FC<UsersProps> = ({ query }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const perPage = 5;

  const {
    data,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['users', { query, perPage }],
    queryFn: () => searchUsers(query, perPage),
    enabled: !!query.length,
  });

  const handleUserClick = (username: string) => {
    setSelectedUser(username === selectedUser ? null : username);
  };

  return (
    <>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {data?.map(user => (
          <UserCard
            key={user.id}
            user={user}
            expanded={user.login === selectedUser}
            onClick={() => handleUserClick(user.login)}
          />
        ))}
      </div>

      {query && !isFetching && !data?.length && !isError && (
        <EmptyState Icon={IconUserOff} title="No Users Found" />
      )}
      <Loader isLoading={isFetching} />

      {isError && (
        <ErrorMessage message="Error searching users. Please try again." />
      )}
    </>
  );
};

export default memo(Users);
