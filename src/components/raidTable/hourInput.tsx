import * as React from 'react';

interface props {
    day: any,
    editHoursMax: any,
    editHoursMin: any,
    dayId: any,
}

export const HourInput = ({ day, editHoursMax, editHoursMin, dayId }: props) => {
    return (
        <td>
            <div className="row">
                <div className="col">
                    <input
                        type="time"
                        name="min"
                        className="form-control"
                        defaultValue={day.min}
                        onChange={(e) => editHoursMin(e, dayId)}
                    />
                </div>
                <div className="col">
                    <input
                        type="time"
                        name="max"
                        className="form-control"
                        defaultValue={day.max}
                        onChange={(e) => editHoursMax(e, dayId)}
                    />
                </div>
            </div>
        </td>
    )
}
