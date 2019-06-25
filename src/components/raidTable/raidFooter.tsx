import * as React from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import * as moment from 'moment';
import { toJS } from 'mobx';

interface props {
    current: any,
    members: any,
    raid: any
}

export const RaidFooter = observer(({ current, members, raid }: props) => {
    const allMembers = [...current, ...members]
    const days = useObservable({
        hours: []
    })
    const findHours = () => {
        const totalDays: any = []
        const max = [];
        const min = [];

        for (let i = 0; i < 7; i++) {
            const minHours: any = [];
            const maxHours: any = [];

            allMembers.map((member: any) => {
                {
                    if (member.days[i].max) {
                        const hour = member.days[i].max.split(':')
                        maxHours.push(moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0))
                    }
                    if (member.days[i].min) {
                        const hour = member.days[i].min.split(':')
                        minHours.push(moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0))
                    }
                }
            })
            max.push(maxHours)
            min.push(minHours)
        }
        let maxHours = max.filter((max) => { return max.length })
        let minHours = max.filter((min) => { return min.length })

        // totalDays.push({
        //     max: moment.max(maxHours),
        //     min: moment.min(minHours)
        // })

        // console.log(totalDays)

        // days.hours = totalDays

    }

    React.useEffect(() => {
        findHours()
    }, [])
    return (
        <tbody>
            <tr>
                <td colSpan={raid.isLeader ? 3 : 2}></td>
                {/* {
                    days.hours && days.hours.map((day) => (
                        <td>
                            {moment(day.min).format("HH:mm")} - {moment(day.max).format("HH:mm")}
                        </td>
                    ))
                } */}
                <td colSpan={2}></td>
            </tr>
        </tbody>
    );
})
