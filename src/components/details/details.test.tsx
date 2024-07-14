import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Details } from './details';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ bookUid: 'testBookUid' }),
  useOutletContext: () => ({ handleCloseDetails: vi.fn() }),
}));

describe('Details Component', () => {
  it('renders component without crashing', async () => {
    render(<Details />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Published year:')).toBeInTheDocument();
    expect(screen.getByText('Number of pages:')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
