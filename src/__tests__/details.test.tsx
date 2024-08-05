import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Details } from './details';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ bookUid: 'testBookUid' }),
  useOutletContext: () => ({ handleCloseDetails: vi.fn() }),
}));

vi.mock('../../controllers/starTrekApi', () => ({
  useFetchBookDetailsQuery: vi.fn(() => ({
    data: {
      book: {
        title: 'Test Book',
        authors: [
          { uid: 1, name: 'Author One' },
          { uid: 2, name: 'Author Two' },
        ],
        publishedYear: 2024,
        numberOfPages: 300,
      },
    },
    error: null,
    isLoading: false,
  })),
}));

describe('Details Component', () => {
  it('renders error state correctly if there is an error', async () => {
    vi.mock('../../controllers/starTrekApi', () => ({
      useFetchBookDetailsQuery: vi.fn(() => ({
        data: null,
        error: new Error('Failed to load book details.'),
        isLoading: false,
      })),
    }));

    render(<Details />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load book details.')).toBeInTheDocument();
    });
  });
});
