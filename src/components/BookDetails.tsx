import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { useBookDetails } from '../hooks/useBookDetails';

interface BookDetailsProps {
  bookId: string;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
  const { book, loading, error } = useBookDetails(bookId);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardContent>
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Back
        </Button>
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={12} md={4}>
            {book?.covers && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers?.at(0)}-L.jpg`}
                alt={book.title}
                style={{ width: '100%' }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{book?.title}</Typography>
            <Typography variant="h6">
              {book?.authors?.map((author) => author.name).join(', ')}
            </Typography>
            <Typography variant="subtitle1">Published: {book?.first_publish_date}</Typography>
            {book?.description && (
              <Typography variant="body1" paragraph>
                {typeof book.description === 'string' ? book.description : book.description.value}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
