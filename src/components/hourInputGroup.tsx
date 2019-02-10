import * as React from 'react';
import { store } from '../store/raidStore';
import { Day } from '../models/interfaces';

interface HourInputGroupProps {
    min: string,
    max: string,
    date: string,
    id: number,
    raidId: number
}

export class HourInputGroup extends React.Component<HourInputGroupProps> {
    render() {
        const { min, max, date, id, raidId } = this.props
        return (
            <td key={date}>
                <div className="row">
                    <div className="col">
                        <input
                            type="time"
                            name="min"
                            className="form-control"
                            defaultValue={min}
                            onChange={(e) => store.editHoursMin(raidId, id, date, e)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="time"
                            name="max"
                            className="form-control"
                            defaultValue={max}
                            onChange={(e) => store.editHoursMax(raidId, id, date, e)}
                        />
                    </div>
                </div>
            </td>
        )
    }
}