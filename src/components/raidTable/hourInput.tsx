import * as React from 'react';

interface props {
    day: any,
    editHoursMax: any,
    editHoursMin: any,
    checkHours: any,
    dayId: any,
}

export const HourInput = ({ day, editHoursMax, editHoursMin, checkHours, dayId }: props) => {
    return (
        <td>
            <div className="row">
                <div className="col">
                    <input
                        type="time"
                        name="min"
                        className="form-control"
                        defaultValue={day.min}
                        onChange={(e) => { editHoursMin(e, dayId); checkHours(dayId) }}
                    />
                </div>
                <div className="col">
                    <input
                        type="time"
                        name="max"
                        className="form-control"
                        defaultValue={day.max}
                        onChange={(e) => { editHoursMax(e, dayId); checkHours(dayId) }}
                    />
                </div>
            </div>
        </td>
    )
}
