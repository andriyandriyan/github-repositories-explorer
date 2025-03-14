import { useState } from 'react';
import { BackToTop, FormInput, Users } from './components';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">GitHub Repositories Explorer</h1>
        <FormInput onSubmit={setQuery} />
        <Users query={query} />
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
