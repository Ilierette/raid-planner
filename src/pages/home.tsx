import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageHeader } from '../components/pageHeader';

import { CharacterData } from '../components/characterData'

export default class Home extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <Card>
            <CardBody>
              <CharacterData name="Letty"/>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
