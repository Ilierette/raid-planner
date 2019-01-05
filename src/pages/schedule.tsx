import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { RaidTable } from '../components/raidTable'
import { raid } from '../data/raid';
import '../scss/content.scss'

interface RaidState {
  raids: any
}

export default class Schedule extends React.Component<RaidState> {
  constructor(props: any) {
    super(props)

    this.state = {
      raids: raid
    }
  }
  toogle = (id: any) => {

    let raidList = this.state.raids.map((raid: any) => {
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
    this.setState({
      raids: raidList
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Raid schedule" />
        <div className="content">
          {this.state.raids.map((raid: any) => (
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
