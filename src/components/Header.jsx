import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    this.setState({
      name: userInfo.name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">
          Search
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favorite songs
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Profile
        </Link>
        {loading ? <Loading /> : <h3 data-testid="header-user-name">{name}</h3>}
      </header>
    );
  }
}

export default Header;
