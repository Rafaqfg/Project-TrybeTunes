import React from 'react';
import Header from '../components/Header';

const MIN_CHAR = 2;
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searchSubmitButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      search: target.value,
    }, () => {
      this.setState({
        searchSubmitButtonDisabled: false,
      });
      if (target.value.length < MIN_CHAR) {
        this.setState({
          searchSubmitButtonDisabled: true,
        });
      }
    });
  }

  handleClick = () => {
    console.log('click');
  }

  render() {
    const { search, searchSubmitButtonDisabled } = this.state;
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
              value={ search }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ searchSubmitButtonDisabled }
            type="submit"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

export default Search;
