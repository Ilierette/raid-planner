import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface props {
    raid: any,
    addUserRow: any,
    editHours: any,
    raidControls: any
}

export const RaidHeader = observer(({ raid, addUserRow, editHours, raidControls }: props) => {
    return (
        <thead>
            <tr>
                {raid.isLeader &&
                    <th rowSpan={2}>
                        <button
                            className="btn btn-outline-primary" onClick={() => addUserRow()}>
                            {
                                !raidControls.isAddMode ?
                                    <FontAwesomeIcon icon="plus" /> :
                                    <FontAwesomeIcon icon="times" />
                            }

                        </button>
                    </th>
                }
                <th rowSpan={2} className="text-left">Name</th>
                <th rowSpan={2} className="text-left">Class</th>
                <th colSpan={7}>
                    <div className="row py-0">
                        <div className="col">Sign up</div>
                        <div className="col-1">
                            <button className=" btn btn-outline-success" onClick={() => editHours()}>
                                {
                                    !raidControls.isEditMode ?
                                        <FontAwesomeIcon icon="pencil-alt" /> :
                                        <FontAwesomeIcon icon="times" />
                                }

                            </button>
                        </div>
                    </div>
                </th>
                <th colSpan={2}>Activity Status</th>
            </tr>
            <tr>
                <th style={{ width: 100 }} >Wednesday</th>
                <th style={{ width: 100 }} >Thursday</th>
                <th style={{ width: 100 }} >Friday</th>
                <th style={{ width: 100 }} >Saturday</th>
                <th style={{ width: 100 }} >Sunday</th>
                <th style={{ width: 100 }} >Monday</th>
                <th style={{ width: 100 }} >Tuesday</th>
                <th >Static</th>
                <th >Main</th>
            </tr>
        </thead>
    );
})
