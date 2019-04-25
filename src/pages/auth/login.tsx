import * as React from 'react';
import '../../scss/auth.scss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { auth } from '../../store/config';

@observer
export default class Login extends React.Component<any> {
  @observable email = "";
  @observable password = "";
  @observable error: any = null;

  onSubmit = (e: any) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(this.email, this.password).then((authUser: any) => {
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
                <input
                  type="email"
                  name="email"
                  value={this.email}
                  onChange={(e) => this.email = e.target.value}
                  className="form-control"
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={this.password}
                  onChange={(e) => this.password = e.target.value}
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => this.onSubmit(e)}
                    >
                      Zaloguj się
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
