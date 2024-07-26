import { describe, it, expect } from 'vitest';
import selectedItemDetailsReducer, { setSelectedItemDetails } from './selectedItemDetailsSlice';
describe('selectedItemDetailsSlice', () => {
  it('handles setSelectedItemDetails action with a non-null payload', () => {
    const initialState = { selectedItemId: null };
    const newState = selectedItemDetailsReducer(initialState, setSelectedItemDetails('some-id'));
    expect(newState.selectedItemId).toBe('some-id');
  });
  it('handles setSelectedItemDetails action with a null payload', () => {
    const initialState = { selectedItemId: 'existing-id' };
    const newState = selectedItemDetailsReducer(initialState, setSelectedItemDetails(null));
    expect(newState.selectedItemId).toBeNull();
  });
});
