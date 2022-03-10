import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, handleInputChange, isChecked } = this.props;
    return (
      <div>
        <p>{`${trackName}`}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite-song">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="isChecked"
            id={ trackId }
            onChange={ handleInputChange }
            checked={ isChecked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
