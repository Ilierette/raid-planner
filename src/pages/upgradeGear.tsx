import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { GearTable } from '../components/gearTable/component';
import { observer } from 'mobx-react';
import { user } from '../store/userStore';
import { market } from '../store/marketStore';

@observer
export default class Gear extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Gear upgrade chart" />
        <div className="content">
          <GearTable />
        </div>
      </div>
    );
  }
}
