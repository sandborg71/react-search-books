import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BookSearch } from './BookSearch';

describe('BookSearch Component', () => {
  const onSearchMock = jest.fn();

  const renderComponent = () =>
    render(
      <Router>
        <BookSearch onSearch={onSearchMock} />
      </Router>
    );

  it('renders the search form...', () => {
    renderComponent();
    expect(screen.getByLabelText(/search for books/i)).toBeInTheDocument();
      
    expect(screen.getByText('Search', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Clear', { exact: true })).toBeInTheDocument();
  });

  it('calls handleSearch on search button click', () => {
    renderComponent();
    
    const input = screen.getByLabelText(/search for books/i);
    fireEvent.change(input, { target: { value: 'React' } });
    expect(input).toHaveValue('React');
    fireEvent.click(screen.getByText('Search', { exact: true }));
    expect(onSearchMock).toHaveBeenCalledWith('React');
  });

  it('clears the input on clear button click', () => {
    renderComponent();
    const input = screen.getByLabelText(/search for books/i);
    fireEvent.change(input, { target: { value: 'React' } });
    expect(input).toHaveValue('React');
    fireEvent.click(screen.getByText('Clear', { exact: true }));
    
    expect(input).toHaveValue('');
    expect(onSearchMock).toHaveBeenCalledWith('');
  });

  it('calls handleSearch on Enter key press', () => {
    renderComponent();
    const input = screen.getByLabelText(/search for books/i);
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledWith('React');
  });
});
