import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedItems } from '../../redux/slices/selectedItemsSlice';
import { Button } from '../button/button';
import { CSVLink } from 'react-csv';

import './flyout.scss';

export const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleUnselectAll = () => {
    dispatch(setSelectedItems([]));
  };

  const handleDownload = () => {
    const csvData = selectedItems.map((book) => ({
      UID: book.uid,
      Title: book.title,
      'Published year': book.publishedYear,
      'Number of pages': book.numberOfPages,
    }));
    return csvData;
  };

  return (
    <div className="flyout">
      <p>
        {selectedItems.length === 1
          ? '1 item is selected'
          : `${selectedItems.length} items are selected`}
      </p>
      <CSVLink data={handleDownload()} filename={`${selectedItems.length}_books.csv`}>
        <Button text="Download" type="button" />
      </CSVLink>
      <Button onClick={handleUnselectAll} text="Unselect all" type="button" />
    </div>
  );
};
