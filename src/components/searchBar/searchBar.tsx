import { Component } from 'react';
import { Button } from '../button/button';

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <h2>SearchBar component</h2>
        <Button type="submit" text="Search" />
      </div>
    );
  }
}
