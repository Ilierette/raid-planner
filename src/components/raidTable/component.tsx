import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidHeader as Header } from './raidHeader';
import { RaidRow as Row } from './raidRow';
import { HourInput } from './hourInput';
import { Raid, Member, User, Day } from '../../models/interfaces';
import '../../scss/table.scss';
import RaidStore from '../../store/raidStore'

interface props {
    raid: Raid,
    index: number
}

export const RaidTable = observer(({ raid, index }: props) => {
    const {
        getSuggestions, selectedCharName, addUser, suggestions, selectChar,
        selectedCharClass, selectedCharIsMain, selectedCharIsStatic, selectIfStatic,
        users,
    } = React.useContext(RaidStore);
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
                                <label htmlFor="token" className="col-2 col-form-label px-0 text-right">{raid.type} - Raid Token</label>
                                <div className="col-10">
                                    <input type="text" readOnly id="token" className="form-control" value="1273t21tguy6" />
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="table-responsive">
                    <table className="table table-sm text-center">
                        <Header index={index} />
                        {
                            raid.isAddMode &&
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        <button className="btn btn-outline-success" onClick={() => addUser(index)}>
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
                                                {suggestions.map((suggestion: any) => (
                                                    <a href="" onClick={(e) => selectChar(e, suggestion)}>{suggestion.name}<br /></a>
                                                ))}
                                            </div>

                                        }
                                    </td>
                                    <td>
                                        {selectedCharClass}
                                    </td>
                                    <td colSpan={6}></td>
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
                            raid.isEditMode &&
                            <tbody>
                                <tr>
                                    <td colSpan={raid.isLeader ? 3 : 2}></td>
                                    {raid.members.map((member: Member) => (
                                        users.map((user: User) => {
                                            if (member.id == user.id) {
                                                return (
                                                    member.days.map((day: Day, id: number) => {
                                                        return (
                                                            <HourInput date={day.date} min={day.min} max={day.max} id={id} raidId={index} />
                                                        )
                                                    })
                                                )

                                            }
                                        })[0]
                                    ))}
                                    <td colSpan={2}></td>
                                </tr>
                            </tbody>
                        }

                        {raid.members.map((member: Member) => (
                            users.map((user: User) => {
                                if (member.id == user.id) {
                                    return (
                                        <Row
                                            o={index}
                                            user={user}
                                            member={member}
                                        />
                                    )
                                }
                            })
                        ))}
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-2 my-auto">
                        {raid.members.length}/{raid.maxMembers}
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

