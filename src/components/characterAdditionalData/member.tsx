import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer, useObservable } from 'mobx-react-lite';
import { db } from '../../store/firebase';
import RaidStore from '../../store/raidContext'
 
interface props {
    raid: any
}

export const MemberRaidList = observer(({ raid }: props) => {
    const { uid } = React.useContext(RaidStore)
    const state = useObservable({
        name: "",
        isStatic: false
    })
    React.useEffect(() => {
        db.collection("raids").doc(raid.id).onSnapshot((snap) => {
            state.name = snap.data().type
        })
        db.collection("raids").doc(raid.id).collection("members").doc(uid).onSnapshot((snap) => {
            state.isStatic = snap.data().isStatic
        })
    })
    return (
        <li className="text-primary">
            {state.name} Raid List
            {
                state.isStatic ?
                    <span className="badge badge-primary ml-2 my-auto">static</span> :
                    <span className="badge badge-secondary ml-2 my-auto">sub</span>
            }
        </li>
    )
})

export const Member = observer(() => {
    const { raids } = React.useContext(RaidStore)
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Raid member</h5>
                <ul className="list-unstyled">
                    {
                        raids && raids.map((raid: any) => {
                            if (!raid.isLeader) {
                                return (
                                    <MemberRaidList raid={raid} />
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div className="card-footer text-muted">
                <a href="/raid-schedule" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add</a>
            </div>
        </div>
    );
})

export const Leader = observer(() => {
    const { raids } = React.useContext(RaidStore)
    return (
        <div className="card text-center text-white bg-dark border-primary">
            <div className="card-body">
                <h5>Raid leader</h5>
                <ul className="list-unstyled">
                    {
                        raids && raids.map((raid: any) => {
                            if (raid.isLeader) {
                                return (
                                    <MemberRaidList raid={raid} />
                                )
                            }
                        })
                    }
                </ul>
            </div>
            <div className="card-footer text-muted">
                <a href="/raid-schedule" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add</a>
            </div>
        </div>
    )
})
