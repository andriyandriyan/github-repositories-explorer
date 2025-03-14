import { IconCode, IconStar } from '@tabler/icons-react';
import { FC, memo } from 'react';
import { GitHubRepo } from '~/interfaces';

interface ReposityItemProps {
  repo: GitHubRepo;
}

const ReposityItem: FC<ReposityItemProps> = ({ repo }) => (
  <div className="py-4">
    <div className="flex justify-between items-center">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-primary hover:text-primary-dark"
      >
        {repo.name}
      </a>
      <span className="flex items-center text-sm text-gray-500">
        <IconStar size={16} className="mr-1" />
        {repo.stargazers_count}
      </span>
    </div>
    {repo.description && (
      <p className="text-gray-600 mt-1">{repo.description}</p>
    )}
    {repo.language && (
      <span className="flex items-center text-sm text-gray-500">
        <IconCode size={16} className="mr-1" />
        {repo.language}
      </span>
    )}
  </div>
);

export default memo(ReposityItem);
