import React from 'react';

class MusicCard extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="inputCheckbox">
          Favorita
          <input
            type="checkbox"
            name=""
            id="inputCheckbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>);
  }
}

export default MusicCard;
