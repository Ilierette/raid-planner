import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { GearTable } from '../../components/gearTable/component';
import { observer } from 'mobx-react-lite';

export const Gear = observer(() => {
  return (
    <div className="content-wrapper">
      <PageHeader title="Gear upgrade chart" />
      <div className="content">
        <GearTable />
      </div>
    </div>
  );
})

