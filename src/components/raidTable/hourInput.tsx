import * as React from 'react';
import RaidStore from '../../store/raidStore'

interface props {
    min: string,
    max: string,
    date: string,
    id: number,
    raidId: number
}

export const HourInput = ({ min, max, date, id, raidId }: props) => {
    const { editHoursMax, editHoursMin } = React.useContext(RaidStore)
    return (
        <td key={date}>
            <div className="row">
                <div className="col">
                    <input
                        type="time"
                        name="min"
                        className="form-control"
                        defaultValue={min}
                        onChange={(e) => editHoursMin(raidId, id, date, e)}
                    />
                </div>
                <div className="col">
                    <input
                        type="time"
                        name="max"
                        className="form-control"
                        defaultValue={max}
                        onChange={(e) => editHoursMax(raidId, id, date, e)}
                    />
                </div>
            </div>
        </td>
    )
}
