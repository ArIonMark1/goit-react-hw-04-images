import './App.scss';
import { PureComponent } from 'react';
import handleSearchHits from './apiService/search_api.js';
import controlPosition from './apiService/controlPosition';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const toastStyle = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default class App extends PureComponent {
  state = {
    page: 1,
    per_page: 12,
    searchRequest: '',
    searchHits: [],
    isLoading: false,
    isButton: false,
  };
  componentDidMount() {
    const searchButton = document.getElementById('LoadMoreButton');
    if (searchButton) {
      searchButton.scrollIntoView();
    }
  }

  componentDidUpdate(_, prevState) {
    const { searchRequest, page, per_page } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      // ++++++++++++++++++++++++++++++++++
      handleSearchHits(searchRequest, page, per_page)
        .then(request => {
          if (request.total === 0) {
            return toast.error(
              'Didn`t find anything on this request',
              toastStyle
            );
          }
          if (request.total > per_page) {
            this.setState({ isButton: true });
          }
          this.setState(prevState => ({
            searchHits: [...prevState.searchHits, ...request.hits],
          }));
        })
        .catch(error => toast.error(error.message, toastStyle))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  // *********************************************
  handleConfirnRequest = searchRequest => {
    // receaving data for searching and state updating
    this.setState({
      page: 1,
      searchRequest,
      searchHits: [],
      isLoading: true,
      isButton: false,
    });
  };
  // *********************************************
  handleLoadMoreData = evt => {
    //  changing page and auto scrolling to button
    this.setState({ page: this.state.page + 1 });

    setTimeout(() => {
      controlPosition();
    }, 500);
  };

  render() {
    const { searchHits, isLoading, isButton } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleConfirnRequest} />
        <ToastContainer />

        {isLoading ? <Loader /> : <ImageGallery picturesArr={searchHits} />}
        {isButton && (
          <Button onConfirm={this.handleLoadMoreData}>Load more</Button>
        )}
      </div>
    );
  }
}
