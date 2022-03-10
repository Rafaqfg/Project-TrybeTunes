import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHAR = 2;
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searchSubmitButtonDisabled: true,
      loading: false,
      artist: '',
      albums: [],
      // response: false,
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

  handleClick = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
      artist: search,
    });
    const response = await searchAlbumsAPI(search);
    this.setState({
      search: '',
      loading: false,
      searchSubmitButtonDisabled: true,
      albums: response,
      // response: true,
    });
  }

  render() {
    const { search, searchSubmitButtonDisabled,
      loading, artist, albums } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header />
        </div>
        {loading
          ? <Loading />
          : (
            <div>
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
              {artist && albums.length <= 0
                ? (<p>Nenhum álbum foi encontrado</p>)
                : (
                  <div>
                    <p>
                      Resultado de álbuns de:
                      {` ${artist}`}
                    </p>
                    <div>
                      {albums.map(({ collectionId, collectionName }) => (
                        <Card
                          key={ collectionId }
                          collectionId={ collectionId }
                          collectionName={ collectionName }
                        />))}
                    </div>
                  </div>)}
            </div>)}
      </div> // div pai
    ); // return fecha aqui
  }
}

export default Search;
