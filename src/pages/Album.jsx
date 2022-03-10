import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const songsList = await getMusics(id);
    const favoritesList = await getFavoriteSongs();
    this.setState({
      loading: false,
      songsList,
      artistName: songsList[0].artistName,
      albumName: songsList[0].collectionName,
      favoritesSongs: [...favoritesList],
    });
  }

  onClick = ({ target }) => {
    const { songsList, favoritesSongs } = this.state;
    const isFavoriteSong = target.checked;
    let songId;
    if (isFavoriteSong) {
      const checkedSong = songsList
        .filter(({ trackId }) => trackId === Number(target.id))
        .reduce((acc) => [acc]);
      songId = checkedSong;
      this.setState({ favoritesSongs: [...favoritesSongs, checkedSong] });
    }
    this.setState({ loading: true },
      async () => {
        await addSong(songId);
        this.setState({ loading: false });
      });
  }

  render() {
    const { artistName, songsList, albumName, loading, favoritesSongs } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{`${artistName}`}</h3>
        <p data-testid="album-name">{`${albumName}`}</p>
        <ul>
          {songsList.map(({ trackName, previewUrl, trackId }, index) => {
            if (!index) return false;
            return (
              <li key={ trackId }>
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  handleInputChange={ this.onClick }
                  isChecked={ favoritesSongs.some((song) => song.trackId === trackId) }
                />
              </li>);
          })}
        </ul>
      </div>);
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
