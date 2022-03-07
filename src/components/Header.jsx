import React from 'react';
import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Loading: false,
    };
  }

  render() {
    return (
      <div data-testid="header-component">
        <header>
          <Link data-testid="link-to-search" to="/Search">
            Search
          </Link>
          <Link data-testid="link-to-favorites" to="/Favorites">
            Favorite songs
          </Link>
          <Link data-testid="link-to-profile" to="/Profile">
            Profile
          </Link>
        </header>
      </div>
    );
  }
}

export default Header;
