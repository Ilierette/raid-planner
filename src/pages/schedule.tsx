import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable';
import '../scss/content.scss';

import { observer } from 'mobx-react';
import { store } from '../store/raidStore';
import { Raid } from '../models/interfaces';

@observer
export default class Schedule extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          {store.raids.map((raid: Raid, index:number) => (
            <RaidTable raid={raid} index={index}/>
          ))}
        </div>
      </div>
    );
  }
}
