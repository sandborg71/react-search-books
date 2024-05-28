import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
}

const getId = (key: string): string => {
  console.log('### key:', key);
  const match = key.match(/\/works\/(\w+)/);
  return match ? match[1] : '';
};

export const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.key}>
          <Card>
            {book.cover_i && (
              <CardMedia
                component="img"
                alt={book.title}
                height="140"
                image={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                title={book.title}
              />
            )}
            <CardContent>
              <Typography variant="h6">
                <Link to={`/book/${getId(book.key)}`}>{book.title}</Link>
              </Typography>
              <Typography variant="subtitle1">{book.author_name?.join(', ')}</Typography>
              <Typography variant="body2">{book.first_publish_date}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
