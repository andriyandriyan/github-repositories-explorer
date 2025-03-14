import { FC, memo } from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading }) => isLoading ? (
  <div className="text-center my-8" data-testid="loader">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-b-transparent mx-auto"></div>
  </div>
) : null;

export default memo(Loader);
