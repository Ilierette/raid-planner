import * as React from 'react';
import '../../scss/auth.scss';
import { Link } from 'react-router-dom';
import { observer, useObservable } from 'mobx-react-lite';
import { auth } from '../../store/config';

export const Login = observer(() => {
  const state = useObservable({
    email: "",
    password: "",
    error: null
  })

  const onSubmit = (e: any) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(state.email, state.password).then(() => {
      this.props.history.push('/');
    }).catch((error: any) => state.error = error);
  }
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
                value={state.email}
                onChange={(e) => state.email = e.target.value}
                className="form-control"
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={(e) => state.password = e.target.value}
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
                    onClick={(e) => onSubmit(e)}
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
})
