import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface props {
    dpsCount: string,
    dpsImg: string
}

export const Parse = ({ dpsCount, dpsImg }: props) => {
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>DPS Parse</h5>
                <h6 className="card-subtitle mb-2 text-muted">{dpsCount}</h6>
                <div className="mt-2"><img src={dpsImg} /></div>
            </div>
            <div className="card-footer text-muted">
                <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add / edit</a>
            </div>
        </div>
    );
}
