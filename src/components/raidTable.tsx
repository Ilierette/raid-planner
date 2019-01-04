import * as React from 'react';
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidTableHeader as Header } from './raidTableHeader';
import { CharacterData } from '../components/characterData';

import users from '../data/users';

import '../scss/table.scss';

interface RaidProps {
    type: string,
    ratio: string,
    timestamp: string,
    maxMembers: any,
    members: [],
    toogle: any
}

interface RaidState {
    users: [],
    isMain: boolean,
    isBadge: boolean,
    region: string,
    activeTab: string
}

export class RaidTable extends React.Component<RaidProps, RaidState> {
    constructor(props: any) {
        super(props)

        this.state = {
            users: users.users,
            region: "eu",
            isMain: true,
            isBadge: true,
            activeTab: '1'
        }
    }
    changeTab = (tab: any) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col offset-sm-5">
                            <div className="form-group row">
                                <label htmlFor="token" className="col-2 col-form-label px-0 text-right">{this.props.type} - Raid Token</label>
                                <div className="col-10">
                                    <input type="text" readOnly id="token" className="form-control" value="1273t21tguy6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm text-center">
                            <Header />
                            {this.props.members.map((member: any) => (
                                this.state.users.map((user: any, index: any) => {
                                    if (member.id == user.id) {
                                        return (
                                            <tbody key={user.id}>
                                                <tr >
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger">
                                                            <FontAwesomeIcon icon="ban" />
                                                        </button>
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td className="edit-checkbox" style={{ width: 31 }}>
                                                        <Input type="checkbox" id={"conf-" + index} defaultChecked={member.isConfirmed} />
                                                        <label htmlFor={"conf-" + index}></label>
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name-col" onClick={() => this.props.toogle(user.id)}>
                                                            <abbr title="Click to check character data">
                                                                {user.name}
                                                            </abbr>
                                                            <FontAwesomeIcon icon="caret-down" className="ml-3" />
                                                        </div>
                                                    </td>
                                                    <td className="text-left">
                                                        {user.class}
                                                    </td>
                                                    {user.days.map((day: any, index: any) => (
                                                        <td key={index}>
                                                            {day.min} - {day.max}
                                                        </td>
                                                    ))}
                                                    <td className="form-group">
                                                        <Input type="select">
                                                            <option value="-"> Static </option>
                                                            <option value="Static"> Sub </option>
                                                        </Input>
                                                    </td>
                                                    <td className="form-group">
                                                        {user.isMain ? "Main" : "Alt"}
                                                    </td>

                                                </tr>
                                                {
                                                    member.isExpanded &&
                                                    <tr>
                                                        <td colSpan={2}></td>
                                                        <td colSpan={10} className="text-left">
                                                            <Nav tabs className="my-1">
                                                                <NavItem>
                                                                    <NavLink
                                                                        className={classnames({ active: this.state.activeTab === '1' })}
                                                                        onClick={() => { this.changeTab('1'); }}>
                                                                        Character Data
                                                                    </NavLink>
                                                                </NavItem>
                                                                <NavItem>
                                                                    <NavLink
                                                                        className={classnames({ active: this.state.activeTab === '2' })}
                                                                        onClick={() => { this.changeTab('2'); }}>
                                                                        Info
                                                                    </NavLink>
                                                                </NavItem>
                                                            </Nav>
                                                            <TabContent activeTab={this.state.activeTab}>
                                                                <TabPane tabId="1" className="bg-dark">
                                                                    <CharacterData name={user.name} region={this.state.region} isMain={user.isMain} isBadge={this.state.isBadge} />
                                                                </TabPane>
                                                                <TabPane tabId="2">
                                                                    {member.notes} <br />
                                                                    User additional message <br />
                                                                    Warnings
                                                                </TabPane>
                                                            </TabContent>
                                                        </td>
                                                        <td colSpan={2}></td>
                                                    </tr>
                                                }
                                            </tbody>
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
                            {this.props.members.length}/{this.props.maxMembers}
                        </div>
                        <div className="col text-right">
                            <button className="btn btn-primary" >Set raid time</button>
                            <button className="btn btn-success ml-1">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
