import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { CharacterData } from '../components/characterData';
import { store } from '../store/raidStore';

interface Props {
    user: any,
    member: any,
    index: any
}

export class RaidTableRow extends React.Component<Props>{
    render() {
        const {
            user,
            member,
            index
        } = this.props
        return (
            <tbody key={store.currentMemberId}>
                <tr >
                    {store.isLeader &&
                        <td>
                            <button
                                className="btn btn-outline-danger" onClick={store.removeUser}>
                                <FontAwesomeIcon icon="ban" />
                            </button>
                        </td>
                    }
                    <td>{index + 1}</td>
                    {store.isLeader &&
                        <td className="edit-checkbox" style={{ width: 31 }}>
                            <Input type="checkbox" id={"conf-" + index} defaultChecked={member.isConfirmed} />
                            <label htmlFor={"conf-" + index}></label>
                        </td>
                    }
                    <td className="text-left">
                        <div className="name-col" onClick={() => store.toogle(user.id)}>
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
                        {!store.isLeader ?
                            <span>
                                {member.isStatic ? "Static" : "Sub"}
                            </span> :
                            <Input type="select">
                                <option value="-"> Static </option>
                                <option value="Static"> Sub </option>
                            </Input>
                        }
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
                                        className={classnames({ active: store.activeTab === '1' })}
                                        onClick={() => { store.changeTab('1'); }}>
                                        Character Data
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: store.activeTab === '2' })}
                                        onClick={() => { store.changeTab('2'); }}>
                                        Info
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={store.activeTab}>
                                <TabPane tabId="1" className="bg-dark">
                                    <CharacterData name={user.name} region={store.region} isMain={user.isMain} isBadge={store.isBadge} />
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

        );
    }
}
