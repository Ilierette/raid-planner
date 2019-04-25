import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CharacterNeedsProps {
    need: any
}

export const CharacterNeeds = ({need}:CharacterNeedsProps) => {
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Needs</h5>
                <ul className="list-unstyled">
                    {
                        need.map((need: any) => (
                            <li>{need.name} {need.isAwakened && <span className="badge badge-success ml-1 my-auto">awakened</span>}  </li>
                        ))
                    }
                </ul>
            </div>
            <div className="card-footer text-muted">
                <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add / edit</a>
            </div>
        </div>
    );
}
