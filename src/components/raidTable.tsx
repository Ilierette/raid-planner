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
    activeTab: string,

    isEditMode: boolean,
    isAddMode: boolean,
    suggestions: any
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
    isExpanded: boolean
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
            suggestions: []

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

    addUser = () => {
        this.setState((prevState) => ({ isAddMode: !prevState.isAddMode, isEditMode: false }))
    }
    editHours = () => {
        this.setState((prevState) => ({ isEditMode: !prevState.isEditMode, isAddMode: false }))
    }
    removeUser = () => {
        console.log("Remove user");
    }

    getSuggestions = (e: any) => {
        const suggest = this.state.users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: any) => {
            return ({
                name: user.name,
                class: user.class
            })
        });

        
        this.setState({
            suggestions: suggest
        })

        console.log(suggest)
    }

    render() {
        const {
            currentMemberFlags,
            users,
            region,
            isBadge,
            isAddMode,
            isEditMode,
            suggestions
        } = this.state;
        const {
            members,
            maxMembers,
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
                                addUser={this.addUser}
                                editHours={this.editHours}
                                isAddMode={isAddMode}
                                isEditMode={isEditMode}
                            />
                            {
                                isAddMode &&
                                <tbody>
                                    <tr>
                                        <td colSpan={3}></td>
                                        <td>
                                            <input
                                                type="text"
                                                name="chars"
                                                list="chars"
                                                className="form-control"
                                                onChange={(e) => this.getSuggestions(e)} />
                                            <datalist id="chars">
                                                {suggestions.map((suggestion: any) => (
                                                    <option>{suggestion.name}<br /></option>
                                                ))}
                                            </datalist>
                                        </td>
                                        <td>
                                            {suggestions.map((suggestion: any) => (
                                                <option>{suggestion.class}<br /></option>
                                            ))[0]}
                                        </td>
                                        <td colSpan={7}></td>
                                        <td>
                                            Static
                                        </td>
                                        <td></td>
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
