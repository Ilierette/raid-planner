import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageHeader } from '../components/pageHeader';

export default class Clan extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Find clan" />
        <div className="content">
          <Card>
            <CardBody>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
