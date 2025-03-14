import { Icon } from '@tabler/icons-react';
import { FC, memo } from 'react';

interface EmptyStateProps {
  Icon: Icon;
  title: string;
}

const EmptyState: FC<EmptyStateProps> = ({ Icon, title }) => (
  <div className="flex flex-col items-center justify-center my-8">
    <Icon size={80} className="text-gray-500 mb-1" />
    <div className="text-gray-700">{title}</div>
  </div>
);

export default memo(EmptyState);
