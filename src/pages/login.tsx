import * as React from 'react';
import '../scss/auth.scss';
import { Link } from 'react-router-dom';
import { user } from '../store/userStore';

export default class Login extends React.Component {
  componentDidMount() {
    console.log(user.isAuthUser);
  }
  render() {
    return (
      <div className="auth-box mx-auto">
        <div className="logo"></div>
        <div className="auth-box mx-auto">
          <div className="logo"></div>
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h1 className="white-text">Raid Planner</h1>
                <hr className="hr-light" />
              </div>
              <form>
                <div className="form-group">
                  <input
                    value=""
                    type="text"
                    className="form-control"
                  />
                  <label htmlFor="email">E-mail</label>
                </div>
                <div className="form-group">
                  <input
                    value=""
                    type="password"
                    className="form-control"
                  />
                  <label htmlFor="form4">Hasło</label>
                  <div className="mt-1">
                    <p className="text-right"></p>
                  </div>
                </div>
                <hr className="hr-light" />
                <div className="mt-4">
                  <div className="row">
                    <div className="col">
                      <Link to="/register" className="btn btn-outline-secondary">
                        Rejestracja
                  </Link>
                    </div>
                    <div className="col text-right">
                      <button type="submit" className="btn btn-primary">
                        Zaloguj się
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
