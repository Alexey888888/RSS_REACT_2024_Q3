import { ChangeEvent, FormEvent } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './searchBar.module.scss';
import { ISearchBarProps } from './IsearchBar';

const SearchBar: React.FC<ISearchBarProps> = ({ term, handleSubmit }) => {
  const [searchTerm, setSearchTerm, updateLocalStorage] = useLocalStorage({
    key: 'searchTerm_888888',
    initValue: term,
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
    <div className={styles.searchBar}>
      <h2>Search for a Star Trek books</h2>
      <form onSubmit={onSubmit}>
        <Input type="text" value={searchTerm} onChange={handleInputChange} />
        <Button type="submit" text="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
