import { renderHook } from '@testing-library/react';
import { useBooks } from './useBooks';
import { Book } from '../types/Book';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

type HookResult = { current: ReturnType<typeof useBooks> } | undefined;

let result: HookResult;

const mockBooks: Book[] = [
  {
    title: 'Test Book',
    key: 'ABC123'
  }
];

describe('useBooks hook', () => {
  beforeEach(() => {
    result = undefined;
  });
  it('should return an empty book array when no query', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { docs: mockBooks } });
    await act(() => ({ result } = renderHook(() => useBooks(''))));

    expect(result?.current.books).toEqual([]);
    expect(result?.current.loading).toBe(false);
    expect(result?.current.error).toBe(null);
  });

  it('should fetch books when query is provided', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { docs: mockBooks } });

    await act(() => ({ result } = renderHook(() => useBooks('book query'))));

    expect(result?.current.books).toEqual(mockBooks);
    expect(result?.current.loading).toBe(false);
    expect(result?.current.error).toBe(null);
  });

  it('should handle errors', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('Some error'));

    await act(() => ({ result } = renderHook(() => useBooks('book query'))));

    expect(result?.current.books).toEqual([]);
    expect(result?.current.loading).toBe(false);
    expect(result?.current.error).toBe('Failed to fetch books');
  });
});
