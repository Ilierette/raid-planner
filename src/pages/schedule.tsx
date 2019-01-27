import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'
import '../scss/content.scss';

import { observer } from 'mobx-react';
import { store } from '../store/raidStore';

@observer
export default class Schedule extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          {store.raids.map((raid: any, index:any) => (
            <RaidTable raid={raid} index={index}/>
          ))}
        </div>
      </div>
    );
  }
}
