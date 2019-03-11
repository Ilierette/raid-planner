import * as React from 'react';
import '../scss/auth.scss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { auth } from '../store/config';

@observer
export default class Register extends React.Component {
  @observable region = "EU";
  @observable username = "";
  @observable email = "";
  @observable passwordOne = "";
  @observable passwordTwo = "";
  @observable error: any = null;

  onSubmit = (e: any) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.email, this.passwordOne).then((authUser: any) => {
      this.props.history.push('/');
    }).catch((error: any) => this.error = error);
  }

  render() {
    return (
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
                <select
                  className="form-control"
                  onChange={(e) => this.region = e.target.value}
                >
                  <option value="EU">EU</option>
                  <option value="NA">NA</option>
                </select>
                <label htmlFor="region" className="">Region</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={this.username}
                  onChange={(e) => this.username = e.target.value}
                  className="form-control"
                />
                <label htmlFor="username" className="">Nazwa postaci</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={this.email}
                  onChange={(e) => this.email = e.target.value}
                  className="form-control"
                />
                <label htmlFor="email" className="">E-mail</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="passwordOne"
                  value={this.passwordOne}
                  onChange={(e) => this.passwordOne = e.target.value}
                  className="form-control"
                />
                <label htmlFor="passwordOne" className="">Hasło</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="passwordTwo"
                  value={this.passwordTwo}
                  onChange={(e) => this.passwordTwo = e.target.value}
                  className="form-control"
                />
                <label htmlFor="passwordTwo" className="">Powtórz hasło</label>
              </div>
              <div className="col-12">
                <small className="text-danger">
                  {this.error && <p>{this.error.message}
                  </p>}
                </small>
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => this.onSubmit(e)}
                    >
                      Rejestracja
                  </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
