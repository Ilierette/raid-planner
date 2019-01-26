import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'
import { raid } from '../data/raid';
import '../scss/content.scss';

import { observable } from "mobx";
import { observer } from 'mobx-react';

interface RaidState {
  raids: Raid[]
}
interface Raid {
  type: string,
  ratio: string,
  timestamp: string,
  maxMembers: number,
  members: Member[]
}
interface Member {
  id: string,
  isFounder: boolean,
  isLeader: boolean,
  isStatic: boolean,
  isConfirmed: boolean,
  isExpanded: boolean,
  notes: string
}

@observer
export default class Schedule extends React.Component<RaidState> {
  
  @observable raids = raid;

  toogle = (id: any) => {
    let raidList = this.raids.map((raid: any) => {
      return ({
        ...raid,
        members: raid.members.map((item: any) => {
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
      })
    })
    
    this.raids = raidList
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          {this.raids.map((raid: any) => (
            <RaidTable
              key={raid.type}
              type={raid.type}
              ratio={raid.ratio}
              timestamp={raid.timestamp}
              maxMembers={raid.maxMembers}
              members={raid.members}
              toogle={this.toogle}
              currentMemberID={"letty"}
            />
          ))}
        </div>
      </div>
    );
  }
}
