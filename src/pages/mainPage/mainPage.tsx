import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/searchTerm';
import { Button } from '../../components/button/button';

import './mainPage.scss';

export class MainPage extends Component<object, IMainPageState> {
  constructor(props: object) {
    super(props);

    this.state = { bookList: [], errorMessage: '', term: '', loading: false, hasError: false };
  }

  componentDidMount = async () => {
    const searchTerm = localStorage.getItem('searchTerm_888888');
    if (!searchTerm) {
      this.getAllBooks();
    } else {
      this.setState({ term: searchTerm });
      this.handleSubmit(searchTerm);
    }
  };

  getAllBooks = async () => {
    try {
      this.setState({ loading: true });
      const pageNumber = 0;
      const pageSize = 50;
      const response = await fetchBookList(pageNumber, pageSize);
      if (response.error) {
        this.setState({ errorMessage: response.error });
      } else if (response.bookList) {
        this.setState({ bookList: response.bookList });
      }
    } catch (error) {
      this.setState({ errorMessage: 'Failed to fetch books.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (term: string) => {
    try {
      this.setState({ loading: true });
      const pageNumber = 0;
      const pageSize = 50;
      if (term) {
        const searchResult = await searchTerm(pageNumber, pageSize, term);
        if (searchResult.bookList) this.setState({ bookList: searchResult.bookList });
      } else this.getAllBooks();
    } catch (error) {
      this.setState({ errorMessage: 'Failed to fetch books.' });
    } finally {
      this.setState({ loading: false });
    }

    localStorage.setItem('searchTerm_888888', term);
  };

  handleErrorButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) throw new Error();

    const { bookList, errorMessage, loading } = this.state;

    return (
      <div className="main-page">
        <div className="container">
          <div className="error-button">
            <Button type="button" text="Error" onClick={this.handleErrorButtonClick}></Button>
          </div>
          <SearchBar handleSubmit={this.handleSubmit} term={this.state.term} />
          {loading && <p className="loading">Loading...</p>}
          {errorMessage && <p>Error: {errorMessage}</p>}
          {!loading && !errorMessage && <ListView bookList={bookList} />}
        </div>
      </div>
    );
  }
}
