import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface props {
    need: any
}

export const Needs = ({need}:props) => {
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Needs</h5>
                <ul className="list-unstyled">
                    <li>Comming soon ...</li>
                    {
                        need && need.map((need: any, id:number) => (
                            <li key={need.name+"-"+id}>{need.name} {need.isAwakened && <span className="badge badge-success ml-1 my-auto">awakened</span>}  </li>
                        ))
                    }
                </ul>
            </div>
            <div className="card-footer text-muted">
                <a href="#"><FontAwesomeIcon icon="plus" className="mr-1" /> Add / edit</a>
            </div>
        </div>
    );
}
