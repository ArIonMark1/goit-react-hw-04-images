import './App.scss';
import { useState, useEffect } from 'react';
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
export default function App() {
  const [page, setPage] = useState(1);
  const [searchRequest, setSearchRequest] = useState('');
  const [searchHits, setSearchHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const PER_PAGE = 12;

  useEffect(() => {
    if (searchRequest === '') {
      return;
    }
    handleSearchHits(searchRequest, page, PER_PAGE)
      .then(request => {
        if (request.total === 0) {
          return toast.error(
            'Didn`t find anything on this request',
            toastStyle
          );
        }
        if (request.total > PER_PAGE) {
          setIsButton(true);
        }
        setSearchHits(searchHits => [...searchHits, ...request.hits]);
      })
      .catch(error => toast.error(error.message, toastStyle))
      .finally(() => setIsLoading(false));
  }, [searchRequest, page]);

  // *********************************************
  function handleConfirnRequest(searchRequest) {
    // we get the data for the search and update the state
    setPage(1);
    setSearchRequest(searchRequest);
    setSearchHits([]);
    setIsLoading(true);
    setIsButton(false);
  }
  // *********************************************
  function handleLoadMoreData() {
    //  Changing the page and automatically scrolling to the button.
    setPage(page + 1);

    setTimeout(() => {
      controlPosition();
    }, 500);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleConfirnRequest} />
      <ToastContainer />

      {isLoading ? <Loader /> : <ImageGallery picturesArr={searchHits} />}
      {isButton && <Button onConfirm={handleLoadMoreData}>Load more</Button>}
    </div>
  );
}
