import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CharacterLeader = () => {
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Raid leader</h5>
            </div>
            <div className="card-footer text-muted">
                <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add / edit</a>
            </div>
        </div>
    )
}
