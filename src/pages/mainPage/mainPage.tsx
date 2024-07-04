import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';

export class MainPage extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ListView />
      </div>
    );
  }
}
