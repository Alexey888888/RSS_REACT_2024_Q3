import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/saerchTerm';

export class MainPage extends Component<object, IMainPageState> {
  constructor(props: object) {
    super(props);

    this.state = { bookList: [], errorMessage: '', term: '', loading: false };
  }

  componentDidMount = async () => {
    this.getAllBooks();
  };

  getAllBooks = async () => {
    this.setState({ loading: true });
    const pageNumber = 0;
    const pageSize = 50;
    const response = await fetchBookList(pageNumber, pageSize);
    if (response.error) {
      this.setState({ errorMessage: response.error });
    } else if (response.bookList) {
      this.setState({ bookList: response.bookList });
    }
    this.setState({ loading: false });
  };

  handleSubmit = async (term: string) => {
    this.setState({ loading: true });
    const pageNumber = 0;
    const pageSize = 50;
    if (term) {
      const searchResult = await searchTerm(pageNumber, pageSize, term);
      if (searchResult.bookList) this.setState({ bookList: searchResult.bookList });
    } else this.getAllBooks();
    this.setState({ loading: false });
  };

  render() {
    const { bookList, errorMessage, loading } = this.state;

    return (
      <div className="main-page">
        <div className="container">
          <SearchBar handleSubmit={this.handleSubmit} term={this.state.term} />
          {loading && <p>Loading...</p>}
          {errorMessage && <p>Error: {errorMessage}</p>}
          <ListView bookList={bookList} />
        </div>
      </div>
    );
  }
}
