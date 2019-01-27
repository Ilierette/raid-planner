import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '../store/raidStore';

export class RaidTableHeader extends React.Component{
    render() {
        return (
            <thead>
                <tr>
                    {store.isLeader &&
                        <th rowSpan={2}>
                            <button
                                className="btn btn-outline-primary" onClick={store.addUser}>
                                {
                                    !store.isAddMode ?
                                        <FontAwesomeIcon icon="plus" /> :
                                        <FontAwesomeIcon icon="times" />
                                }

                            </button>
                        </th>
                    }
                    <th rowSpan={2}>LP</th>
                    {store.isLeader &&
                        <th rowSpan={2}>*</th>
                    }
                    <th rowSpan={2} className="text-left">Name</th>
                    <th rowSpan={2} className="text-left">Class</th>
                    <th colSpan={7}>
                        <div className="row py-0">
                            <div className="col">Sign up</div>
                            <div className="col-1">
                                <button className=" btn btn-outline-success" onClick={store.editHours}>
                                    {
                                        !store.isEditMode ?
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
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Static</th>
                    <th>Main</th>
                </tr>
            </thead>
        );
    }
}
