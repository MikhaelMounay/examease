import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthWrapper';
import LoginPage from './LoginView';

// Mock the `useAuth` hook
vi.mock('../../contexts/AuthWrapper', () => ({
  useAuth: vi.fn(),
}));

describe('LoginPage Tests', () => {
  let mockLogin: jest.Mock;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();

    mockLogin = vi.fn();
    (useAuth as vi.Mock).mockReturnValue({
      login: mockLogin,
    });

    mockLogin.mockReset();
  });

  test('displays an error when fields are empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Email and password are required.')).toBeInTheDocument();
  });

  test('logs in successfully with valid credentials', async () => {
    mockLogin.mockResolvedValueOnce(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1234567' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('valid@email.com', '1234567');
    });
  });
});
