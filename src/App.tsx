import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BookPage } from './pages/BookPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'book/:id',
    element: <BookPage />
  }
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
