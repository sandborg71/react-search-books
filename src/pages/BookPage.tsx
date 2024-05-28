import React from 'react';
import { useParams } from 'react-router-dom';
import { BookDetails } from '../components/BookDetails';

export const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }
  return <BookDetails bookId={id} />;
};
