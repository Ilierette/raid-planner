import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { GearTable } from '../../components/gearTable/component';
import gearContext from '../../store/gearContext'
import { observer } from 'mobx-react-lite';

export const Gear = observer(() => {
  const { isLoading, isLoadingMats } = React.useContext(gearContext)
  return (
    <div className="content-wrapper">
      <PageHeader title="Gear upgrade chart" />
      <div className="content">
        {
          !isLoading && !isLoadingMats &&
          <GearTable />
        }
      </div>
    </div>
  );
})

