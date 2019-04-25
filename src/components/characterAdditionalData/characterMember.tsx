import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CharacterMember = () => {
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Raid member</h5>
                <ul className="list-unstyled">
                    <li><a href="" >TT Raid List <span className="badge badge-primary ml-1 my-auto">static</span> </a></li>
                    <li><a href="" >VT Raid List <span className="badge badge-secondary ml-1 my-auto">sub</span> </a></li>
                </ul>
            </div>
            <div className="card-footer text-muted">
                <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add / edit</a>
            </div>
        </div>
    );
}
