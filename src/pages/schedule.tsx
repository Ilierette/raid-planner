import * as React from 'react';
import raid from '../data/raid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../scss/content.scss'
import { Card, CardBody } from 'reactstrap';

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
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-title">
              <h4>
                <FontAwesomeIcon icon="table" className="mr-3" />
                Kalendarz
                </h4>
            </div>
          </div>
        </div>
        <div className="breadcrumb-line">
          <div className="d-flex">
            <div className="breadcrumb breadcrumb-site">
              <a className="breadcrumb-item"><FontAwesomeIcon icon="home" className="mr-1" /> Home</a>
              <a className="breadcrumb-item">Kalendarz</a>
            </div>
          </div>
        </div>
        <div className="content">
          <Card>
            <CardBody>
              <h5 className="card-title">{this.state.raid.type}</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Nick</td>
                      <td>Class</td>
                      <td>Środa</td>
                      <td>Czwartek</td>
                      <td>Piątek</td>
                      <td>Sobota</td>
                      <td>Niedziela</td>
                      <td>Poniedziałek</td>
                      <td>Wtorek</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.raid.members.map((member: any, index: any) => (
                      <tr key={index}>
                        <td>
                          {member.characterName}
                        </td>
                        <td>
                          {member.class}
                        </td>
                        {
                          member.days.map((day: any, index: any) => (
                            <td key={index}>{day.min} - {day.max}</td>
                          ))
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
