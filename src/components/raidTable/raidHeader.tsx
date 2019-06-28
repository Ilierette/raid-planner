import * as React from 'react';
import { observer } from 'mobx-react-lite';

interface props {
    raid: any,
}

export const RaidHeader = observer(({ raid }: props) => {
    return (
        <thead>
            <tr>
                {raid.isLeader &&
                    <th rowSpan={2}></th>
                }
                <th rowSpan={2} className="text-left">Name</th>
                <th rowSpan={2} className="text-left">Class</th>
                <th colSpan={7}>Sign up</th>
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
