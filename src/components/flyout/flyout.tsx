import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedItems } from '../../redux/slices/selectedItemsSlice';

import './flyout.scss';
import { Button } from '../button/button';

export const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleUnselectAll = () => {
    dispatch(setSelectedItems([]));
  };

  return (
    <div className="flyout">
      <p>
        {selectedItems.length === 1
          ? '1 item is selected'
          : `${selectedItems.length} items are selected`}
      </p>
      <Button onClick={handleUnselectAll} text="Unselect all" type="button" />
    </div>
  );
};
