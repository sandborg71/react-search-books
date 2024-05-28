import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BookPage } from './pages/BookPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'book/:id',
    element: <BookPage />
  }
]);
