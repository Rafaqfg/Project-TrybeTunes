import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      songsList: [],
      artistName: '',
      albumName: '',
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const songsList = await getMusics(id);
      const favoritesList = await getFavoriteSongs();
      this.setState({
        loading: false,
        songsList,
        artistName: songsList[0].artistName,
        albumName: songsList[0].collectionName,
        favoritesSongs: [...favoritesList],
      });
    });
  }

  onClick = ({ target }) => {
    const { songsList } = this.state;
    const isFavoriteSong = target.checked;
    const checkedSong = songsList
      .filter(({ trackId }) => trackId === Number(target.id))
      .reduce((acc) => [acc]);
    if (isFavoriteSong) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(checkedSong);
        const getSong = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoritesSongs: getSong,
        });
      });
    }
    this.setState({
      loading: true,
    }, async () => {
      await removeSong(checkedSong);
      const getSong = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoritesSongs: getSong,
      });
    });
  }

  render() {
    const { artistName, songsList, albumName, loading, favoritesSongs } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <Header />
        </div>
        { loading
          ? <Loading />
          : (
            <div>
              <div>
                <h3 data-testid="artist-name">{`${artistName}`}</h3>
                <p data-testid="album-name">{`${albumName}`}</p>
              </div>
              <ul>
                {songsList.map(({ trackName, previewUrl, trackId }) => (
                  !trackId
                    ? ''
                    : (
                      <MusicCard
                        key={ trackId }
                        trackName={ trackName }
                        previewUrl={ previewUrl }
                        trackId={ trackId }
                        handleInputChange={ this.onClick }
                        isChecked={ favoritesSongs
                          .some((song) => song.trackId === trackId) }
                      />)))}
              </ul>
            </div>)}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
// https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
