import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const useBooks = (query: string): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://ope  nlibrary.org/search.json?q=${query}`);

        setBooks(response.data.docs);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, loading, error };
};
