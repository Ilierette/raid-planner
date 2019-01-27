import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidTableHeader as Header } from './raidTableHeader';
import { users } from '../data/users';
import '../scss/table.scss';
import { RaidTableRow as Row } from './raidTableRow';

interface RaidProps {
    type: string,
    ratio: string,
    timestamp: string,
    maxMembers: number,
    members: Member[],
    toogle: any,
    currentMemberID: string
}
interface RaidState {
    users: User[],
    isMain: boolean,
    isBadge: boolean,
    currentMemberFlags: Flag[],
    region: string,

    isEditMode: boolean,
    isAddMode: boolean,
    suggestions: any,
    isSuggestions: boolean,

    selectedCharId: string,
    selectedCharName: string,
    selectedCharClass: string,
    selectedCharIsMain: boolean,
    selectedCharIsStatic: boolean,
    selectedCharHours: any
}
interface User {
    id: string,
    name: string,
    class: string,
    region: string,
    isMain: boolean,
    days: Day[],
    mats: Mat[]
}
interface Day {
    date: string,
    min: string,
    max: string
}
interface Mat {
    id: string,
    amount: number
}
interface Member {
    id: string,
    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
    notes: string
}
interface Flag {
    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
}

export class RaidTable extends React.Component<RaidProps, RaidState> {
    constructor(props: any) {
        super(props)

        this.state = {
            users: users,
            region: "eu",
            isMain: true,
            isBadge: true,
            activeTab: '1',
            isRaidLeader: false,
            currentMemberFlags: [],

            isEditMode: false,
            isAddMode: false,
            suggestions: null,

            selectedCharId: null,
            selectedCharName: "",
            selectedCharClass: "",
            selectedCharIsMain: null,
            selectedCharIsStatic: null,
            selectedCharHours: null


        }
    }
    componentDidMount() {
        const currentMember = this.props.members.filter((member: any) => {
            return member.id == this.props.currentMemberID
        })[0]
        this.setState({
            currentMemberFlags: currentMember
        })

    }

    addUserRow = () => {
        this.setState((prevState) => ({ isAddMode: !prevState.isAddMode, isEditMode: false }))
    }
    editHours = () => {
        this.setState((prevState) => ({ isEditMode: !prevState.isEditMode, isAddMode: false }))
    }

    getSuggestions = (e: any) => {

        const suggest = this.state.users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: any) => {
            return user
        });
        this.setState({
            suggestions: suggest.length == 0 ? null : suggest,
            selectedCharName: e.target.value,
            selectedCharId: null,
            selectedCharClass: null,
            selectedCharIsMain: null,
            selectedCharIsStatic: null,
            selectedCharHours: null
        })
    }

    selectChar = (e: any, item: any) => {
        e.preventDefault();
        this.setState({
            selectedCharId: item.id,
            selectedCharName: item.name,
            selectedCharClass: item.class,
            selectedCharIsMain: item.isMain,
            suggestions: null,
            selectedCharIsStatic: true,
            selectedCharHours: item.days
        })

    }
    selectIfStatic = (e: any) => {
        if (e.target.value == "Static") {
            this.setState({
                selectedCharIsStatic: true
            })
        }
        else {
            this.setState({
                selectedCharIsStatic: false
            })
        }
    }

    addUser = () => {
        const selectedChar = {
            id: this.state.selectedCharId,
            name: this.state.selectedCharName,
            class: this.state.selectedCharClass,
            isMain: this.state.selectedCharIsMain,
            days: this.state.selectedCharHours
        }

        this.setState(prevState =>({
            members:[...prevState.members, selectedChar],
        }))
    }
    removeUser = () => {
        console.log("Remove user");
    }

    render() {
        const {
            currentMemberFlags,
            users,
            region,
            isBadge,
            isAddMode,
            isEditMode,
            suggestions,
            selectedCharClass,
            selectedCharName,
            selectedCharIsMain,
            selectedCharIsStatic
        } = this.state;
        const {
            maxMembers,
            members,
            toogle
        } = this.props;
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 my-auto">
                            {currentMemberFlags.isLeader &&
                                <span>
                                    <FontAwesomeIcon icon="crown" /> <strong>Raid leader </strong>
                                </span>
                            }
                        </div>
                        {currentMemberFlags.isLeader &&
                            <div className="col-8">
                                <div className="form-group row">
                                    <label htmlFor="token" className="col-2 col-form-label px-0 text-right">{this.props.type} - Raid Token</label>
                                    <div className="col-10">
                                        <input type="text" readOnly id="token" className="form-control" value="1273t21tguy6" />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm text-center">
                            <Header
                                flags={currentMemberFlags}
                                addUser={this.addUserRow}
                                editHours={this.editHours}
                                isAddMode={isAddMode}
                                isEditMode={isEditMode}
                            />
                            {
                                isAddMode &&
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>
                                            <button className="btn btn-outline-success" onClick={this.addUser}>
                                                <FontAwesomeIcon icon="save" />
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="chars"
                                                className="form-control"
                                                onChange={(e) => this.getSuggestions(e)}
                                                value={selectedCharName}
                                            />
                                            {
                                                suggestions &&
                                                <div className="suggestions-box">
                                                    {suggestions.map((suggestion: any) => (
                                                        <a href="" onClick={(e) => this.selectChar(e, suggestion)}>{suggestion.name}<br /></a>
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
                                                <select className="form-control" onChange={(e) => this.selectIfStatic(e)}>
                                                    <option value="Static"> Static </option>
                                                    <option value="Sub"> Sub </option>
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
                                isEditMode &&
                                <tbody>
                                    <tr>
                                        <td colSpan={currentMemberFlags.isLeader ? 5 : 3}></td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tbody>
                            }

                            {members.map((member: any) => (
                                users.map((user: any, index: any) => {
                                    if (member.id == user.id) {
                                        return (
                                            <Row
                                                user={user}
                                                member={member}
                                                currentMemberFlags={currentMemberFlags}
                                                removeUser={this.removeUser}
                                                toogle={toogle}
                                                index={index}
                                                region={region}
                                                isBadge={isBadge}
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
                            {members.length}/{maxMembers}
                        </div>
                        <div className="col text-right">
                            {currentMemberFlags.isLeader &&
                                <button className="btn btn-primary" >Set raid time</button>
                            }
                            <button className="btn btn-success ml-1">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
