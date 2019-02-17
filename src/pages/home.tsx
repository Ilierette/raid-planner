import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import Badge from 'reactstrap/lib/Badge';

export default class Home extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <div className="card">
            <div className="card-body">
              <h3>Welcome to (BNS) game tools</h3>
              <span>This site is currently under construction! </span>
              <hr />
              <span>
                We all love spreadsheets, right? Well... not really. <br />
                <br />
                Of course, it is a amazing tool, but it's limited functions encourage me to write my own application.<br />
                This app will be written in React as single-page application. The database will be Firebase.<br />
                I'm still looking for ways to improve backend, so I'll wait for all suggestions working well with React.
                <br />

                <Badge className="mr-2" href="https://game-tools-b5a6d.firebaseapp.com/" color="primary">Current link</Badge>
                <Badge className="mr-2" href="https://github.com/Ilierette/raid-planner" color="secondary">Repository</Badge>
                <Badge className="mr-2" href="https://slate.silveress.ie/docs_bns#introduction" color="success">BNS API</Badge>
                <Badge className="mr-2" href="https://reactjs.org/docs/hello-world.html" color="danger">React Docs</Badge>
                <Badge href="http://eu-bns.ncsoft.com/ingame/bs/character/profile?c=Letty&s=207" color="warning">Ingame F2</Badge>

              </span>

            </div>
          </div>
        </div>
      </div >
    );
  }
}
