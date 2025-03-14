import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { FC, memo } from 'react';
import { GitHubUser } from '~/interfaces';
import UserRepositories from './UserRepositories';

interface UserCardProps {
  user: GitHubUser;
  expanded: boolean;
  onClick(): void;
}

const UserCard: FC<UserCardProps> = ({ user, expanded, onClick }) => (
  <div
    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center gap-4 cursor-pointer" onClick={onClick} data-testid="user-card">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-12 h-12 rounded-full"
      />
      <h3 className="text-lg font-semibold">{user.login}</h3>
      <div className="ml-auto">
        {expanded ? <IconChevronUp /> : <IconChevronDown />}
      </div>
    </div>
    {expanded && <UserRepositories username={user.login} />}
  </div>
);

export default memo(UserCard);
