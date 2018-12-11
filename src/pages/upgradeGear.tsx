import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageHeader } from '../components/pageHeader';
import { GearTable } from '../components/gearTable';

import upgrade from '../data/upgrade';

interface GearState {
  gear: [],
}

export default class Gear extends React.Component<GearState> {
  constructor(props: any) {
    super(props)

    this.state = { weapon: upgrade.weapon }
  }
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Gear upgrade chart" />
        <div className="content">
          <GearTable items={this.state.weapon} title="Weapon" />
        </div>
      </div>
    );
  }
}
