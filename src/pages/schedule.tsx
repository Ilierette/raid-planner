import * as React from 'react';
import raid from '../data/raid';

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
      <div className="container">
        <h1>Kalendarz</h1>
        {this.state.raid.type}
        <ul>
          {this.state.raid.members.map((member: any, index: any) => (
            <li key={index}>
              {member.characterName} - {member.class}
              <ul>
                {
                  member.days.map((day: any, index: any) => (
                    <li key={index}>{day.date} - {day.min} - {day.max} - {day.note}</li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
