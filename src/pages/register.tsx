import * as React from 'react';
import '../scss/auth.scss';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <h1 className="white-text">Raid Planner</h1>
            <hr className="hr-light" />
          </div>
          <form>
            <div className="form-group">
              <select
                className="form-control">

                <option value="EU">EU</option>
                <option value="NA">NA</option>
              </select>
              <label htmlFor="region" className="">Region</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
              />
              <label htmlFor="name" className="">Nazwa postaci</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
              />
              <label htmlFor="email" className="">E-mail</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
              />
              <label htmlFor="passwordOne" className="">Hasło</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
              />
              <label htmlFor="passwordTwo" className="">Powtórz hasło</label>
            </div>
            <hr className="hr-light" />
            <div className="mt-4">
              <div className="row">
                <div className="col">
                  <Link to="/login" className="btn btn-outline-secondary">
                    Logowanie
                  </Link>
                </div>
                <div className="col text-right">
                  <button type="submit" className="btn btn-primary">
                    Rejestracja
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}
