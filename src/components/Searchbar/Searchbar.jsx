import { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.scss';
import { toast } from 'react-toastify';
/*
Компонент приймає один проп onSubmit – 
функцію для передачі значення інпута під час сабміту форми. 
*/
export default function Searchbar({ onSubmit }) {
  const [searchData, setSearchData] = useState('');

  function handleSubmitForm(evt) {
    evt.preventDefault();
    if (searchData.trim() === '') {
      return toast.error('Please Enter data for searching.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    onSubmit(searchData);
    setSearchData('');
  }
  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            value={searchData}
            onChange={evt =>
              setSearchData(evt.currentTarget.value.toLowerCase())
            }
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
