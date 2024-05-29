import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface BookSearchProps {
  onSearch: (query: string) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query');
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [location]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/?query=${query}`);
    onSearch(query);
  };

  const clear = () => {
    navigate(`/`);
    setQuery('');
    onSearch('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box mt={4} mb={4}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for books"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="space-evenly">
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={clear}>
              Clear
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
