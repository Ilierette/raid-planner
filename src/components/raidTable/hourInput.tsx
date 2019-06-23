import * as React from 'react';
import RaidStore from '../../store/raidStore'

interface props {
    day: any
}

export const HourInput = ({ day }: props) => {
    const { editHoursMax, editHoursMin } = React.useContext(RaidStore)
    return (
        <td>
            <div className="row">
                <div className="col">
                    <input
                        type="time"
                        name="min"
                        className="form-control"
                        defaultValue={day.min}
                        onChange={(e) => editHoursMin(raidId, id, date, e)}
                    />
                </div>
                <div className="col">
                    <input
                        type="time"
                        name="max"
                        className="form-control"
                        defaultValue={day.max}
                        onChange={(e) => editHoursMax(raidId, id, date, e)}
                    />
                </div>
            </div>
        </td>
    )
}
