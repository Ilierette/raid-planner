import * as React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageHeader } from '../components/pageHeader';

import upgrade from '../data/upgrade';

interface GearState {
  gear: []
}

export default class Gear extends React.Component<GearState> {
  constructor(props: any) {
    super(props)

    this.state = { gear: upgrade }
  }
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Gear" />
        <div className="content">
          <Card>
            <CardBody>
              <ul>
                {this.state.gear.earring.map((item: any, index: any) => (
                  <li key={index}>{item.name} - {item.type}
                    <ul>
                      {item.stages.map((stage: any, index: any) => (
                        <li key={index}>
                          {stage.name}
                          <ul>
                            <li>Gold: {stage.gold}</li>
                            <li>Elysian: {stage.elysian}</li>
                            <li>Sacred: {stage.sacred}</li>
                            <li>Moonstone: {stage.moonstone}</li>
                            <li>Soulstone: {stage.soulstone}</li>
                            <li>PTS: {stage.pts}</li>
                            <li>Legendary Jewel: {stage.Legendary_jewel}</li>
                            <li>Blue Crux: {stage.blue_crux}</li>
                            <li>Celestial Wing: {stage.celestial_wing}</li>
                            <li>Pristine Oil: {stage.pristine_oil}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
