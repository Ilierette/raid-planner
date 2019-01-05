import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CharacterParseProps{
    dpsCount: any,
    dpsImg:any
}

export class CharacterParse extends React.Component<CharacterParseProps> {
    render() {
        return (
            <div className="card text-center text-white bg-dark border-primary">
                <div className="card-body">
                    <h5>DPS Parse</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.dpsCount}</h6>
                    <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Update parse</a>
                    <div className="mt-2"><img src={this.props.dpsImg} /></div>
                </div>
            </div>
        );
    }
}
