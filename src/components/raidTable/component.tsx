import * as React from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidHeader as Header } from './raidHeader';
import { RaidRow as Row } from './raidRow';
import { HourInput } from './hourInput';
import '../../scss/table.scss';
import RaidStore from '../../store/raidStore';
import { db } from '../../store/config';
import { toJS } from 'mobx';

interface props {
    raid: any,
    index: number
}

export const RaidTable = observer(({ raid, index }: props) => {
    const {
        getSuggestions, selectedCharId, selectedCharName, suggestions, selectChar,
        selectedCharClass, selectedCharIsMain, selectedCharIsStatic, selectIfStatic,
        selectedCharHours
    } = React.useContext(RaidStore);

    const raidData = useObservable({
        id: "",
        maxMembers: 0,
        minMembers: 0,
        raidLeaderId: "",
        ratio: "",
        timestamp: "",
        type: "",
        members: []
    })

    const raidControls = useObservable({
        isAddMode: false,
        isEditMode: false,
    })

    const addUserRow = () => {
        raidControls.isEditMode = false;
        raidControls.isAddMode = !raidControls.isAddMode;
    }
    const editHours = () => {
        raidControls.isEditMode = !raidControls.isEditMode;
        raidControls.isAddMode = false;
    }

    const editHoursMin = (e: any, memberId: any, dayId: any) => {
        raidData.members[memberId].days[dayId].min = e.target.value
    }

    const editHoursMax = (e: any, memberId: any, dayId: any) => {
        raidData.members[memberId].days[dayId].max = e.target.value
    }
    const addUser = () => {
        let id = selectedCharId
        raidControls.isAddMode = false;
        db.collection("raids").doc(raid.id).collection("members").doc(id).set({
            id: selectedCharId,
            isConfirmed: false,
            isStatic: selectedCharIsStatic,
            notes: "",
            days: selectedCharHours
        }).then(() => {
            db.collection("users").doc(id).collection("raids").doc(raid.id).set({
                id: raid.id,
                isLeader: false
            })
        })
    }

    React.useEffect(() => {
        db.collection("raids").doc(raid.id).get().then((snap) => {
            raidData.maxMembers = snap.data().maxMembers;
            raidData.minMembers = snap.data().minMembers;
            raidData.raidLeaderId = snap.data().raidLeaderId;
            raidData.ratio = snap.data().ratio;
            raidData.timestamp = snap.data().timestamp;
            raidData.type = snap.data().type;
        })

        db.collection("raids").doc(raid.id).collection("members").onSnapshot((snap) => {
            const raidMembers = snap.docs.map((doc) => {
                return doc.data()
            })
            console.log(raidMembers)
            
            raidData.members = raidMembers
        })

    },[])
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-4 my-auto">
                        {raid.isLeader &&
                            <span>
                                <FontAwesomeIcon icon="crown" /> <strong>Raid leader </strong>
                            </span>
                        }
                    </div>
                    {raid.isLeader &&
                        <div className="col-8">
                            <div className="form-group row">
                                <label htmlFor="token" className="col-2 col-form-label px-0 text-right">{raidData.type} - Raid Token</label>
                                <div className="col-10">
                                    <input type="text" readOnly id="token" className="form-control" value={raid.id} />
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="table-responsive">
                    <table className="table table-sm text-center">
                        <Header raid={raid} addUserRow={addUserRow} editHours={editHours} raidControls={raidControls} />
                        {
                            raidControls.isAddMode &&
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="btn btn-outline-success" onClick={() => addUser()}>
                                            <FontAwesomeIcon icon="save" />
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="chars"
                                            className="form-control"
                                            onChange={(e) => getSuggestions(e)}
                                            value={selectedCharName || ""}
                                        />
                                        {
                                            suggestions &&
                                            <div className="suggestions-box">
                                                {suggestions.map((suggestion: any, id: any) => (
                                                    <a href="" onClick={(e) => selectChar(e, suggestion)} key={id}>{suggestion.name}<br /></a>
                                                ))}
                                            </div>

                                        }
                                    </td>
                                    <td>
                                        {selectedCharClass}
                                    </td>
                                    <td colSpan={7}></td>
                                    <td>
                                        {selectedCharIsStatic != null ?
                                            <select
                                                className="form-control"
                                                onChange={(e) => selectIfStatic(e)}
                                                defaultValue={selectedCharIsStatic ? "static" : "sub"}
                                            >
                                                <option value="static"> Static </option>
                                                <option value="sub"> Sub </option>
                                            </select>
                                            : ""
                                        }
                                    </td>
                                    <td>
                                        {selectedCharIsMain != null ? selectedCharIsMain ? "Main" : "Alt" : ""}
                                    </td>
                                </tr>
                            </tbody>
                        }
                        {
                            raidControls.isEditMode &&
                            <tbody>
                                <tr>
                                    <td colSpan={raid.isLeader ? 3 : 2}></td>
                                    {
                                        raidData.members && raidData.members.map((member: any, memberId: any) => (
                                            member.days.map((day: any, dayId: any) => (
                                                <HourInput
                                                    day={day}
                                                    editHoursMax={editHoursMax} editHoursMin={editHoursMin}
                                                    memberId={memberId}
                                                    dayId={dayId} />
                                            ))
                                        ))
                                    }
                                    <td colSpan={2}></td>
                                </tr>
                            </tbody>
                        }

                        {raidData.members && raidData.members.map((member: any) => (
                            <Row
                                isLeader={raid.isLeader}
                                member={member}
                            />
                        ))}

                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-2 my-auto">
                        {raidData.members.length}/{raidData.maxMembers}
                    </div>
                    <div className="col text-right">
                        {raid.isLeader &&
                            <button className="btn btn-outline-secondary btn-sm mr-2" >
                                Recruit players
                                    <Badge color="secondary" pill className="ml-1">58</Badge>
                            </button>
                        }
                        {raid.isLeader &&
                            <button className="btn btn-primary btn-sm" >Set raid time</button>
                        }
                        <button className="btn btn-success btn-sm ml-1">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
})

