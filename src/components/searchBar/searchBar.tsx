import { ChangeEvent, Component } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { ISearchBarState } from './ISearchBar';

import './searchBar.scss';

export class SearchBar extends Component<object, ISearchBarState> {
  constructor(props: object) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value.trim();
    this.setState({ searchTerm: newSearchTerm });
  };

  render() {
    return (
      <div className="search-bar">
        <form>
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
