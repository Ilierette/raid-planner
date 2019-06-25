import * as React from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import * as moment from 'moment';
import { toJS } from 'mobx';
import { db } from '../../store/config';

interface props {
    raid: any
}

export const RaidFooter = observer(({ raid }: props) => {
    const state = useObservable({
        isLoading: true,
        members: []
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
                const hour = max.split(':')
                return moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0)
            })
            const minHour = min.filter((min: any) => { return min }).map((min: any) => {
                const hour = min.split(':')
                return moment().day(i + 3).hour(hour[0]).minute(hour[1]).second(0)
            })
            console.log(moment().max(maxHour))
            allHours.push({
                max: moment().max(maxHour),
                min: moment().max(minHour)
            })
        }
        console.log(allHours)


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
                state.isLoading &&
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
            }
        </tbody>
    );
})
