import * as React from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidHeader as Header } from './raidHeader';
import { RaidRow as Row } from './raidRow';
import { HourInput } from './hourInput';
import '../../scss/table.scss';
import { db } from '../../store/firebase';
import { toJS } from 'mobx';
import { RaidFooter as Footer } from './raidFooter';
import * as moment from 'moment';
import RaidStore from '../../store/raidContext'
import { initDays } from '../../models/data';

interface props {
    raid: any
}

export const RaidTable = observer(({ raid }: props) => {
    const { uid, isLoadingUsers, users } = React.useContext(RaidStore);

    const raidData = useObservable({
        id: "",
        maxMembers: 0,
        minMembers: 0,
        raidLeaderId: "",
        ratio: "",
        timestamp: "",
        type: "",
        members: [],
        currentMember: []
    })

    const raidControls = useObservable({
        isAddMode: false,
        isEditMode: false,
        isLoading: true,
        goodHours: true,
        goodPlayer: true
    })

    const suggestion = useObservable({
        suggestions: null,
        selectedCharName: null,
        selectedCharId: null,
        selectedCharClass: null,
        selectedCharIsMain: null,
        selectedCharIsStatic: null,
        selectedCharHours: null,
    })

    const addUserRow = () => {
        raidControls.isEditMode = false;
        raidControls.isAddMode = !raidControls.isAddMode;
    }
    const editHours = () => {
        raidControls.goodHours = true
        raidControls.isEditMode = !raidControls.isEditMode;
        raidControls.isAddMode = false;
    }

    const editHoursMin = (e: any, dayId: any) => {
        raidData.currentMember.map((member: any) => {
            if (member.id == uid) {
                member.days[dayId].min = e.target.value
            }
        })
    }

    const editHoursMax = (e: any, dayId: any) => {
        raidData.currentMember.map((member: any) => {
            if (member.id == uid) {
                member.days[dayId].max = e.target.value
            }
        })
    }

    const checkHours = (dayId: any) => {
        raidControls.goodHours = false
        raidData.currentMember.map((member: any) => {
            if (member.id == uid) {
                let max = member.days[dayId].max
                let min = member.days[dayId].min;
                let minMoment
                let maxMoment
                if (max) {
                    let maxHour = max.split(':')
                    maxMoment = moment().day(dayId + 3).hour(maxHour[0]).minute(maxHour[1]).second(0)
                }
                if (min) {
                    let minHour = min.split(':')
                    minMoment = moment().day(dayId + 3).hour(minHour[0]).minute(minHour[1]).second(0)
                }
                if (moment(maxMoment).isAfter(minMoment)) {
                    raidControls.goodHours = false
                }
                if (!max || !min) {
                    raidControls.goodHours = true
                }
            }
        })
    }

    const saveHours = () => {
        raidControls.goodHours = true;
        raidControls.isEditMode = false;
        const members = toJS(raidData.currentMember)
        const hours = members.filter((member: any) => { return member.id == uid })[0].days
        db.collection("raids").doc(raid.id).collection("members").doc(uid).update({
            days: hours
        })
    }

    const addUser = () => {
        let id = suggestion.selectedCharId
        raidControls.isAddMode = false;
        db.collection("raids").doc(raid.id).collection("members").doc(id).set({
            id: suggestion.selectedCharId,
            isConfirmed: false,
            isStatic: suggestion.selectedCharIsStatic,
            notes: "",
            days: suggestion.selectedCharHours
        }).then(() => {
            db.collection("users").doc(id).collection("raids").doc(raid.id).set({
                id: raid.id,
                isLeader: false
            })
        })
    }

    const getSuggestions = (e: any) => {
        const suggest = users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: any) => {
            return user
        });

        suggestion.selectedCharName = e.target.value;
        suggestion.suggestions = suggest.length == 0 ? null : suggest;
        suggestion.selectedCharId = null;
        suggestion.selectedCharClass = null;
        suggestion.selectedCharIsMain = null;
        suggestion.selectedCharIsStatic = null;
        suggestion.selectedCharHours = null
    }

    const selectChar = (e: any, item: any) => {
        e.preventDefault();
        suggestion.selectedCharName = item.name;
        suggestion.suggestions = null;
        suggestion.selectedCharId = item.id;
        suggestion.selectedCharClass = item.class;
        suggestion.selectedCharIsMain = item.isMain;
        suggestion.selectedCharIsStatic = true;
        suggestion.selectedCharHours = initDays;
        raidControls.goodPlayer = false
    }

    const selectIfStatic = (e: any) => {
        if (e.target.value == "Static") {
            suggestion.selectedCharIsStatic = true
        }
        else {
            suggestion.selectedCharIsStatic = false
        }
    }

    const removeUser = (id: any) => {
        db.collection("raids").doc(raid.id).collection("members").doc(id).delete()
        db.collection("users").doc(id).collection("raids").doc(raid.id).delete()
    }

    const removeRaid = () => {
        const id = raid.id;
        const allMembers = [...raidData.members, ...raidData.currentMember]
        allMembers.map((member: any) => {
            db.collection("users").doc(member.id).collection("raids").doc(id).delete()
            db.collection("raids").doc(raid.id).collection("members").doc(member.id).delete()
        })
        db.collection("raids").doc(id).delete()
    }

    React.useEffect(() => {
        db.collection("raids").doc(raid.id).get().then((snap) => {
            raidData.maxMembers = snap.data().maxMembers;
            raidData.minMembers = snap.data().minMembers;
            raidData.raidLeaderId = snap.data().raidLeaderId;
            raidData.ratio = snap.data().ratio;
            raidData.timestamp = snap.data().timestamp;
            raidData.type = snap.data().type;

            db.collection("raids").doc(raid.id).collection("members").onSnapshot((snap) => {
                const members: any = []
                snap.docs.map((doc) => {
                    if (doc.data().id != uid) {
                        members.push(doc.data())
                    }
                    raidControls.isLoading = true;
                })
                raidData.members = members
                raidControls.isLoading = false;
            })
            db.collection("raids").doc(raid.id).collection("members").doc(uid).get().then((doc) => {
                raidData.currentMember = [doc.data()]
            })
        })
    }, [])
    return (
        <div className="card mb-3">
            <div className="card-body">
                {raid.isLeader ?
                    <div className="row">
                        <div className="col-2 my-auto">
                            <h5><FontAwesomeIcon icon="crown" /> <strong>Raid leader </strong></h5>
                        </div>
                        <div className="col-10">
                            <div className="form-group row">
                                <label htmlFor="token" className="col-8 col-form-label px-0 text-right">{raidData.type} token</label>
                                <div className="col-4">
                                    <input type="text" readOnly id="token" className="form-control" value={raid.id} />
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="row">
                        <div className="col text-center mb-1">
                            <h5>{raidData.type}</h5>
                        </div>
                    </div>
                }

                <div className="table-responsive">
                    <table className="table table-sm text-center">
                        <Header raid={raid} />
                        {
                            raidControls.isAddMode &&
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="chars"
                                            className="form-control"
                                            onChange={(e) => getSuggestions(e)}
                                            value={suggestion.selectedCharName || ""}
                                        />
                                        {
                                            !isLoadingUsers && suggestion.suggestions &&
                                            <div className="suggestions-box">
                                                {suggestion.suggestions.map((suggestion: any, id: any) => (
                                                    <a href="" onClick={(e) => selectChar(e, suggestion)} key={id}>{suggestion.name}<br /></a>
                                                ))}
                                            </div>

                                        }
                                    </td>
                                    <td>
                                        {suggestion.selectedCharClass}
                                    </td>
                                    <td colSpan={7}></td>
                                    <td>
                                        {suggestion.selectedCharIsStatic != null ?
                                            <select
                                                className="form-control"
                                                onChange={(e) => selectIfStatic(e)}
                                                defaultValue={suggestion.selectedCharIsStatic ? "static" : "sub"}
                                            >
                                                <option value="static"> Static </option>
                                                <option value="sub"> Sub </option>
                                            </select>
                                            : ""
                                        }
                                    </td>
                                    <td>
                                        {suggestion.selectedCharIsMain != null ? suggestion.selectedCharIsMain ? "Main" : "Alt" : ""}
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
                                        raidData.currentMember && raidData.currentMember.map((member: any) => (
                                            member.days.map((day: any, dayId: any) => {
                                                if (member.id == uid) {
                                                    return (
                                                        <HourInput
                                                            day={day}
                                                            key={member.id + "-" + dayId}
                                                            editHoursMax={editHoursMax} editHoursMin={editHoursMin}
                                                            checkHours={checkHours}
                                                            dayId={dayId}
                                                        />
                                                    )
                                                }
                                            })
                                        ))
                                    }
                                    <td colSpan={2}></td>
                                </tr>
                            </tbody>
                        }

                        {raidData.currentMember && raidData.currentMember.map((member) => (
                            <Row
                                isLeader={raid.isLeader}
                                member={member}
                                key={member.id}
                                removeUser={removeUser}
                            />
                        ))}

                        {!raidControls.isLoading && raidData.members.map((member: any) => (
                            <Row
                                isLeader={raid.isLeader}
                                member={member}
                                key={member.id}
                                removeUser={removeUser}
                            />
                        ))}
                        {
                            !raidControls.isLoading &&
                            <Footer raid={raid} />
                        }
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col">
                        {
                            raidControls.isEditMode ?
                                <div>
                                    {
                                        !raidControls.goodHours ?
                                            <button className="btn btn-success btn-sm mr-3" onClick={() => saveHours()} >
                                                Save hours
                                            </button> :
                                            <button className="btn btn-secondary btn-sm mr-3" onClick={() => { raidControls.isEditMode = false }}>
                                                Cancel
                                            </button>
                                    }
                                </div> :
                                <button className="btn btn-success btn-sm mr-3"
                                    onClick={() => editHours()} >
                                    Edit hours
                                </button>
                        }
                    </div>
                    {raid.isLeader &&
                        <div className="col text-right">
                            <button className="btn btn-primary btn-sm ml-1" >Set raid time</button>
                            <button className="btn btn-outline-secondary btn-sm ml-1" >
                                Recruit players
                                <Badge color="secondary" pill className="ml-1">0</Badge>
                            </button>

                            {
                                raidControls.isAddMode ?
                                    !raidControls.goodPlayer ?
                                        <button className="btn btn-success btn-sm ml-1" onClick={() => addUser()} >
                                            Save player
                                            </button> :
                                        <button className="btn btn-secondary btn-sm ml-1" onClick={() => { raidControls.isAddMode = false }}>
                                            Cancel
                                            </button> :
                                    <button className="btn btn-success btn-sm ml-1" onClick={() => addUserRow()} >
                                        Add player
                                </button>
                            }

                            <button className="btn btn-danger btn-sm ml-1" onClick={() => removeRaid()} >Remove raid</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
})

