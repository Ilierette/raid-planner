import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { CharacterData } from '../components/characterData';
import { store } from '../store/raidStore';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { User, Member, Day } from '../models/interfaces';

interface RaidTableRowProps {
    o: number,
    user: User,
    member: Member,
}

interface RaidTableRowState {
    activeTab: number;
}

@observer
export class RaidTableRow extends React.Component<RaidTableRowProps, RaidTableRowState>{
    constructor(props: any) {
        super(props)

        this.state = {
            activeTab: 1,
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
        const {
            o,
            user,
            member,
        } = this.props;
        return (
            <tbody key={user.id}>
                <tr >
                    {store.raids[o].isLeader &&
                        <td>
                            {
                                user.id != store.currentMemberId ?
                                    <button
                                        className="btn btn-outline-danger" onClick={() => store.removeUser(o, user.id)}>
                                        <FontAwesomeIcon icon="ban" />
                                    </button> :
                                    ""
                            }

                        </td>
                    }
                    {store.raids[o].isLeader &&
                        <td className="edit-checkbox" style={{ width: 31 }}>
                            <Input type="checkbox" id={"conf-" + o} defaultChecked={member.isConfirmed} />
                            <label htmlFor={"conf-" + o}></label>
                        </td>
                    }
                    <td className="text-left">
                        <div className="name-col" onClick={() => store.toogle(o, user.id)}>
                            <abbr title="Click to check character data">
                                {user.name}
                            </abbr>
                            <FontAwesomeIcon icon="caret-down" className="ml-3" />
                        </div>
                    </td>
                    <td className="text-left">
                        {user.class}
                    </td>
                    {member.days.map((day: Day, index: number) => (
                        <td key={index}>
                            {day.min} - {day.max}
                        </td>
                    ))}
                    <td className="form-group">
                        {!store.raids[o].isLeader ?
                            <span>
                                {member.isStatic ? "static" : "sub"}
                            </span> :
                            <Input type="select"
                                defaultValue={member.isStatic ? "static" : "sub"}
                            >
                                <option value="static"> static </option>
                                <option value="sub"> sub </option>
                            </Input>
                        }
                    </td>
                    <td className="form-group">
                        {user.isMain ? "main" : "alt"}
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
                                        className={classnames({ active: this.state.activeTab === 1 })}
                                        onClick={() => { this.changeTab(1); }}>
                                        Character Data
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 2 })}
                                        onClick={() => { this.changeTab(2); }}>
                                        Info
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId={1} className="bg-dark">
                                    <CharacterData name={user.name} region={store.region} isMain={user.isMain} isBadge={store.isBadge} />
                                </TabPane>
                                <TabPane tabId={2}>
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

        );
    }
}
