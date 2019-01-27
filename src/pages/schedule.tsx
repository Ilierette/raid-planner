import * as React from 'react';
import { store } from '../store/raidStore';
import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'
import '../scss/content.scss';

export default class Schedule extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          {store.raids.map((raid: any) => (
            <RaidTable raid={raid} />
          ))}
        </div>
      </div>
    );
  }
}
