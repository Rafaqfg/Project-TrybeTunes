import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_CHAR = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loginSubmitButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {
      this.setState({
        loginSubmitButtonDisabled: false,
      });
      if (target.value.length < MIN_CHAR) {
        this.setState({
          loginSubmitButtonDisabled: true,
        });
      }
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { name, loginSubmitButtonDisabled, loading, redirect } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="input-login">
            Nome:
            <input
              name="name"
              type="text"
              id="input-login"
              placeholder="Insira seu nome"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ loginSubmitButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {!redirect ? '' : <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
