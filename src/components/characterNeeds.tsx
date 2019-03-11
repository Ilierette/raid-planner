import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CharacterNeedsProps {
    need: any
}

export class CharacterNeeds extends React.Component<CharacterNeedsProps> {
    render() {
        return (
            <div className="card text-center text-white bg-dark border-primary">
                <div className="card-body">
                    <h5>Needs</h5>
                    <ul className="list-unstyled">
                        {
                            this.props.need.map((need: any) => (
                                <li>{need.name} {need.isAwakened && <span className="badge badge-success ml-1 my-auto">awakened</span>}  </li>
                            ))
                        }
                        <li><a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add EQ</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
