import * as React from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import * as moment from 'moment';
import { db } from '../../store/config';

interface props {
    raid: any
}

export const RaidFooter = observer(({ raid }: props) => {
    const state = useObservable({
        isLoading: true,
        members: [],
        hours: []
    })
    const findHours = () => {
        const allHours: any = [];
        for (let i = 0; i < 7; i++) {
            const max: any = [];
            const min: any = []
            state.members.map((member) => {
                max.push(member.days[i].max)
                min.push(member.days[i].min)
            })
            const maxHour = max.filter((max: any) => { return max }).map((max: any) => {
                if (max) {
                    const hour = max.split(':')
                    return moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0)
                }
            })
            const minHour = min.filter((min: any) => { return min }).map((min: any) => {
                if (min) {
                    const hour = min.split(':')
                    return moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0)
                }
            })

            allHours.push({
                max: maxHour.length != 0 ? moment.min(maxHour) : "",
                min: minHour.length != 0 ? moment.max(minHour) : ""
            })
        }
        state.hours = allHours
    }

    React.useEffect(() => {
        db.collection("raids").doc(raid.id).collection("members").onSnapshot((snap) => {
            const members: any = []
            snap.docs.map((doc) => {
                members.push(doc.data())
                state.isLoading = true;
            })
            state.members = members
            state.isLoading = false;
            findHours()
        })
    }, [])
    return (
        <tbody>
            {
                !state.isLoading &&
                <tr>
                    <td colSpan={raid.isLeader ? 3 : 2}></td>
                    {
                        state.hours && state.hours.map((day) => (
                            <td>
                                {
                                    day.min &&
                                    moment(day.min).format("HH:mm")
                                }
                                <span> - </span>
                                {
                                    day.max &&
                                    moment(day.max).format("HH:mm")
                                }
                            </td>
                        ))
                    }
                    <td colSpan={2}></td>
                </tr>
            }
            {
                !state.isLoading &&
                <tr>
                    <td colSpan={raid.isLeader ? 3 : 2}></td>
                    {state.hours && state.hours.map((day) => (
                        <td>
                            {
                                day.min && day.max &&
                                <span>
                                    {moment(moment.duration(day.max.diff(day.min)).asMilliseconds()).utc().format('HH:mm')}
                                </span>
                            }
                        </td>
                    ))}
                    <td colSpan={2}></td>
                </tr>
            }
        </tbody>
    );
})
