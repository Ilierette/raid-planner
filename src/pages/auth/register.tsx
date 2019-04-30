import * as React from 'react';
import '../../scss/auth.scss';
import { Link } from 'react-router-dom';
import { auth, db } from '../../store/config';
import { useObservable, observer } from 'mobx-react-lite';

const initNeeds = [{
  name: "",
  isAwakened: false
}]

const initRaid = [{
  raidId: ""
}]

export const Register = observer(() => {
  const state = useObservable({
    region: "EU",
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
    matsList: []
  })

  const onSubmit = (e: any) => {
    e.preventDefault();
    let mats: any = [];
    db.collection("mats").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        mats.push({
          amount: 0,
          id: doc.id,
          show: true
        })
      })
      state.matsList = mats;
    })
    auth.createUserWithEmailAndPassword(state.email, state.passwordOne).then((authUser: any) => {
      return db.collection("users").doc(authUser.user.uid).set({
        region: state.region,
        username: state.username,
        email: state.email,
        dpsParse: "",
        dpsParseValue: "",
        needs: initNeeds,
        raidMember: initRaid,
        raidLeader: initRaid,
        isMain: true,
        mats: state.matsList
      }).then(() => {
        this.props.history.push('/');
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error: any) => this.error = error);
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
              <select
                className="form-control"
                onChange={(e) => state.region = e.target.value}
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
                value={state.username}
                onChange={(e) => state.username = e.target.value}
                className="form-control"
              />
              <label htmlFor="username" className="">Nazwa postaci</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={(e) => state.email = e.target.value}
                className="form-control"
              />
              <label htmlFor="email" className="">E-mail</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordOne"
                value={state.passwordOne}
                onChange={(e) => state.passwordOne = e.target.value}
                className="form-control"
              />
              <label htmlFor="passwordOne" className="">Hasło</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordTwo"
                value={state.passwordTwo}
                onChange={(e) => state.passwordTwo = e.target.value}
                className="form-control"
              />
              <label htmlFor="passwordTwo" className="">Powtórz hasło</label>
            </div>
            <div className="col-12">
              <small className="text-danger">
                {state.error && <p>{state.error.message}
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
                    onClick={(e) => onSubmit(e)}
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
})
