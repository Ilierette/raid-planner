import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RaidStore from '../../store/raidStore'

interface props {
    index: number
}

export const RaidHeader = observer(({ index }: props) => {
    const { raids, addUserRow, editHours } = React.useContext(RaidStore)
    return (
        <thead>
            <tr>
                {raids[index].isLeader &&
                    <th rowSpan={2}>
                        <button
                            className="btn btn-outline-primary" onClick={() => addUserRow(index)}>
                            {
                                !raids[index].isAddMode ?
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
                            <button className=" btn btn-outline-success" onClick={() => editHours(this.props.index)}>
                                {
                                    !raids[index].isEditMode ?
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
