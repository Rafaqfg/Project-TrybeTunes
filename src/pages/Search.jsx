import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <label htmlFor="searchArtist">
            Pesquise por banda ou artista:
            <input
              type="text"
              id="searchArtist"
              placeholder="Insira banda ou artista"
              data-testid="search-artist-input"
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled="disabled"
            type="submit"
            // onClick={ console.log('oi') }
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

export default Search;
