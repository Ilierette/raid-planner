import * as React from 'react';

import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'

import raid from '../data/raid';

import '../scss/content.scss'

interface RaidState {
  type: string,
  ratio: string,
  timestamp: string,
  maxMembers: any,
  members: []
}

export default class Schedule extends React.Component<RaidState> {
  constructor(props: any) {
    super(props)

    this.state = {
      type: raid.type,
      ratio: raid.ratio,
      timestamp: raid.timestamp,
      maxMembers: raid.maxMembers,
      members: raid.members
    }
  }
  toogle = (id: any) => {

    let raidList = this.state.members.map((item: any) => {
      if (item.id == id) {
        return ({
          ...item,
          isExpanded: !item.isExpanded
        })
      }
      else {
        return ({
          ...item,
          isExpanded: false
        })
      }
    })

    console.log(raidList);

    this.setState({
      members: raidList
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          <RaidTable
            type={this.state.type}
            ratio={this.state.ratio}
            timestamp={this.state.timestamp}
            maxMembers={this.state.maxMembers}
            members={this.state.members}
            toogle={this.toogle}
          />
        </div>
      </div>
    );
  }
}
