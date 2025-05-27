import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (query: string, maxResults: number) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [maxResults, setMaxResults] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), maxResults);
    }
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-input-container'>
        <Search className='search-icon' size={20} />
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='검색어를 입력하세요...'
          className='search-input'
          disabled={loading}
        />
      </div>

      <div className='search-options'>
        <label htmlFor='maxResults'>결과 수:</label>
        <select
          id='maxResults'
          value={maxResults}
          onChange={(e) => setMaxResults(Number(e.target.value))}
          className='max-results-select'
          disabled={loading}
        >
          <option value={5}>5개</option>
          <option value={10}>10개</option>
          <option value={20}>20개</option>
          <option value={50}>50개</option>
        </select>
      </div>

      <button
        type='submit'
        className='search-button'
        disabled={loading || !query.trim()}
      >
        {loading ? '검색 중...' : '검색'}
      </button>
    </form>
  );
};

export default SearchForm;
