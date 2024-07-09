import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { ISearchBarProps } from './ISearchBar';

import './searchBar.scss';

export const SearchBar: React.FC<ISearchBarProps> = ({ handleSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm_888888');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value.trim();
    setSearchTerm(newSearchTerm);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSubmit(searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <Input type="text" value={searchTerm} onChange={handleInputChange} />
        <Button type="submit" text="Search" />
      </form>
    </div>
  );
};
