import { Component } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';

export class MainPage extends Component<object, IMainPageState> {
  constructor(props: object) {
    super(props);

    this.state = { bookList: [], errorMessage: '' };
  }

  componentDidMount = async () => {
    const response = await fetchBookList(0, 20);
    if (response.error) {
      this.setState({ errorMessage: response.error });
    } else if (response.bookList) {
      this.setState({ bookList: response.bookList });
    }
    console.log(this.state);
  };

  render() {
    const { bookList, errorMessage } = this.state;

    return (
      <div className="main-page">
        <div className="container">
          <SearchBar />
          {errorMessage && <p>Error: {errorMessage}</p>}
          <ListView bookList={bookList} />
        </div>
      </div>
    );
  }
}
