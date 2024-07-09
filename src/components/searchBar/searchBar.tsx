import { ChangeEvent, FormEvent } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { ISearchBarProps } from './ISearchBar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import './searchBar.scss';

export const SearchBar: React.FC<ISearchBarProps> = ({ handleSubmit }) => {
  const [searchTerm, setSearchTerm, updateLocalStorage] = useLocalStorage({
    key: 'searchTerm_888888',
    initValue: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value.trim();
    setSearchTerm(newSearchTerm);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSubmit(searchTerm);
    updateLocalStorage();
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
