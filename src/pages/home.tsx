import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import Badge from 'reactstrap/lib/Badge';
import { Changelog } from '../components/changelog';
import { links, data } from '../models/data';


export const Home = () => {
  return (
    <div className="content-wrapper">
      <PageHeader title="Home" />
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h2>Welcome to (BNS) game tools</h2>
            <h4 className="card-subtitle mb-2 text-muted">This site is currently under construction! </h4>
            <hr />
            <p>
              We all love spreadsheets, right? Well... not really. <br />
              <br />
              Of course, it is a amazing tool, but it's limited functions encourage me to write my own application.<br />
              This app will be written in React as single-page application. The database will be Firebase.
                <br />

              {
                links.map((link: any, id: any) => (
                  <Badge
                    key={id}
                    className="mr-2"
                    href={link.link}
                    color={link.color}>
                    {link.title}
                  </Badge>
                ))
              }
            </p>
            <div>
              <h5>Functionality checklist:</h5>
              {
                data.map((data: any, id: any) => (
                  <Changelog log={data} key={id} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

