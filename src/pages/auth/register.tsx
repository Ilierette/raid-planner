import * as React from 'react';
import '../../scss/auth.scss';
import { Link } from 'react-router-dom';
import { auth, db } from '../../store/config';
import { useObservable, observer } from 'mobx-react-lite';

const initNeeds = [{
  name: "",
  isAwakened: false
}]

const initGears: any = []

export const Register = observer(() => {
  const state = useObservable({
    region: "EU",
    name: "",
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
        name: state.name,
        email: state.email,
        dpsParse: "",
        dpsParseValue: "",
        isMain: true,
        id: authUser.user.uid
      }).then(() => {
        state.matsList.map((mat) => {
          db.collection("users").doc(authUser.user.uid).collection("mats").doc(mat.id).set({
            amount: mat.amount,
            id: mat.id,
            show: mat.show
          })
        })
      }).then(()=>{
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
            <h1 className="white-text">Game tools</h1>
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
                name="name"
                value={state.name}
                onChange={(e) => state.name = e.target.value}
                className="form-control"
              />
              <label htmlFor="name" className="">Character Name</label>
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
              <label htmlFor="passwordOne" className="">Password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordTwo"
                value={state.passwordTwo}
                onChange={(e) => state.passwordTwo = e.target.value}
                className="form-control"
              />
              <label htmlFor="passwordTwo" className="">Confirm password</label>
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
                    Login
                  </Link>
                </div>
                <div className="col text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => onSubmit(e)}
                  >
                    Register
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
