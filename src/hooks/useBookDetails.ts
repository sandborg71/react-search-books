import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';

interface UseBookDetailsResult {
  book: Book | null;
  loading: boolean;
  error: string | null;
}

export const useBookDetails = (bookId: string): UseBookDetailsResult => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
        setBook(response.data);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return { book, loading, error };
};
