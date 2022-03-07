import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
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
