import { ChangeEvent, Component, FormEvent } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { ISearchBarProps, ISearchBarState } from './ISearchBar';

import './searchBar.scss';

export class SearchBar extends Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value.trim();
    this.setState({ searchTerm: newSearchTerm });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.handleSubmit(this.props.bookList, this.state.searchTerm);
  };

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            value={this.state.searchTerm}
            placeholder="input search term"
            onChange={this.handleInputChange}
          />
          <Button type="submit" text="Search" />
        </form>
      </div>
    );
  }
}
