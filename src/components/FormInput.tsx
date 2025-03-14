import { IconX } from '@tabler/icons-react';
import { FC, memo, useState } from 'react';

interface FormInputProps {
  onSubmit(query: string): void;
}

const FormInput: FC<FormInputProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (!username.trim()) return;
    onSubmit(username);
  };

  return (
    <div className="max-w-2xl mx-auto mb-4 flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && handleSearch()}
          placeholder="Enter username"
          className="px-4 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-primary bg-white w-full"
          data-testid="search-input"
        />
        {username && (
          <button
            type="button"
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setUsername('')}
            data-testid="clear-button"
          >
            <IconX size={18} />
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        type="button"
        data-testid="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default memo(FormInput);
