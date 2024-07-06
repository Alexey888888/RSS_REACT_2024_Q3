import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IBook, IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/saerchTerm';

export class MainPage extends Component<object, IMainPageState> {
  originalBookList: IBook[] = [];

  constructor(props: object) {
    super(props);

    this.state = { bookList: [], errorMessage: '', term: '' };
  }

  componentDidMount = async () => {
    const response = await fetchBookList(0, 20);
    if (response.error) {
      this.setState({ errorMessage: response.error });
    } else if (response.bookList) {
      this.originalBookList = response.bookList;
      this.setState({ bookList: response.bookList });
    }
  };

  componentWillUnmount() {
    this.setState({ bookList: this.originalBookList });
  }

  handleSubmit = (bookList: IBook[], term: string) => {
    if (term) {
      const filterBookList = searchTerm(bookList, term);
      this.setState({ bookList: filterBookList });
    } else this.setState({ bookList: this.originalBookList });
  };

  render() {
    const { bookList, errorMessage } = this.state;

    return (
      <div className="main-page">
        <div className="container">
          <SearchBar
            handleSubmit={this.handleSubmit}
            bookList={this.originalBookList}
            term={this.state.term}
          />
          {errorMessage && <p>Error: {errorMessage}</p>}
          <ListView bookList={bookList} />
        </div>
      </div>
    );
  }
}
