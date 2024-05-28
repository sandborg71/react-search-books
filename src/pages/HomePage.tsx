import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BookList } from '../components/BookList';
import { BookSearch } from '../components/BookSearch';
import { useBooks } from '../hooks/useBooks';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState<string>('');
  const { books, loading, error } = useBooks(query);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [location]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <Container>
      <BookSearch onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <BookList books={books} />
    </Container>
  );
};
