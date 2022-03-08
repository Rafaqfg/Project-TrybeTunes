import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { collectionId, collectionName } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          {`${collectionName}`}
        </Link>
      </div>
    );
  }
}
export default Card;

Card.propTypes = {
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};
