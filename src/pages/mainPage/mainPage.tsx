import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/saerchTerm';

export class MainPage extends Component<object, IMainPageState> {
  constructor(props: object) {
    super(props);

    this.state = { bookList: [], errorMessage: '', term: '' };
  }

  componentDidMount = async () => {
    this.getAllBooks();
  };

  getAllBooks = async () => {
    const pageNumber = 0;
    const pageSize = 50;
    const response = await fetchBookList(pageNumber, pageSize);
    if (response.error) {
      this.setState({ errorMessage: response.error });
    } else if (response.bookList) {
      this.setState({ bookList: response.bookList });
    }
  };

  handleSubmit = async (term: string) => {
    const pageNumber = 0;
    const pageSize = 50;
    if (term) {
      const searchResult = await searchTerm(pageNumber, pageSize, term);
      if (searchResult.bookList) this.setState({ bookList: searchResult.bookList });
    } else this.getAllBooks();
  };

  render() {
    const { bookList, errorMessage } = this.state;

    return (
      <div className="main-page">
        <div className="container">
          <SearchBar handleSubmit={this.handleSubmit} term={this.state.term} />
          {errorMessage && <p>Error: {errorMessage}</p>}
          <ListView bookList={bookList} />
        </div>
      </div>
    );
  }
}
