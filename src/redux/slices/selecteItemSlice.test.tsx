import { describe, it, expect } from 'vitest';
import selectedItemDetailsReducer, { setSelectedItemDetails } from './selectedItemDetailsSlice';
describe('selectedItemDetailsSlice', () => {
  it('handles setSelectedItemDetails action', () => {
    const initialState = { selectedItemId: null };
    const newState = selectedItemDetailsReducer(initialState, setSelectedItemDetails('some-id'));
    expect(newState.selectedItemId).toBe('some-id');
  });
});
