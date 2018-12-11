import * as React from 'react';

import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'

import raid from '../data/raid';

import '../scss/content.scss'

interface RaidState {
  raid: []
}

export default class Schedule extends React.Component<RaidState> {
  constructor(props: any) {
    super(props)

    this.state = { raid: raid }
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          <RaidTable raid={this.state.raid}/>
        </div>
      </div>
    );
  }
}
