import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { GearTable } from '../components/gearTable';

import upgrade from '../data/upgradeBelt';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface GearState {
  gear: [],
}

@observer
export default class Gear extends React.Component<GearState> {

  @observable gear =  upgrade.belt

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Gear upgrade chart" />
        <div className="content">
          <GearTable items={this.gear} title="Weapon" />
        </div>
      </div>
    );
  }
}
