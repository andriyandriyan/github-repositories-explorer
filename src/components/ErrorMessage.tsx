import { FC, memo } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-red-500 text-center mb-4" data-testid="error-message">
    {message}
  </div>
);

export default memo(ErrorMessage);
