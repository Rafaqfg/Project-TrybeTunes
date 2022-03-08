import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      // loading: false,
      musicsList: [],
      artistName: '',
      albumName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // this.setState({ loading: true });
    const musicsList = await getMusics(id);
    this.setState({
      // loading: false,
      musicsList,
      artistName: musicsList[0].artistName,
      albumName: musicsList[0].collectionName,
    });
  }

  render() {
    const { artistName, musicsList, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{`${artistName}`}</h3>
        <p data-testid="album-name">{`${albumName}`}</p>
        <ul>
          {musicsList.map(({ trackName, previewUrl }, index) => {
            if (index === 0) return false;
            return (<MusicCard
              key={ trackName }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />);
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
