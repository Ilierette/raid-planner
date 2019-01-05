import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class CharacterLeader extends React.Component {
    render() {
        return (
            <div className="card text-center text-white bg-dark border-primary">
                <div className="card-body">
                    <h5>Raid leader</h5>
                    <ul className="list-unstyled">
                        <li><a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add raid</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
