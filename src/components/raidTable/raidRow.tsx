import * as React from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import classnames from 'classnames';
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CharacterDataSearch } from '../../components/characterDataSearch';
import { User, Member, Day } from '../../models/interfaces';
import RaidStore from '../../store/raidStore'

interface props {
    o: number,
    user: User,
    member: Member,
}

export const RaidRow = observer(({ o, user, member }: props) => {
    const { raids, currentMemberId, removeUser, toogle, region, isBadge } = React.useContext(RaidStore)
    const state = useObservable({
        activeTab: 1
    })

    const changeTab = (tab: any) => {
        if (state.activeTab !== tab) {
            state.activeTab = tab
        }
    }

    return (
        <tbody key={user.id}>
            <tr >
                {raids[o].isLeader &&
                    <td>
                        {
                            user.id != currentMemberId ?
                                <button
                                    className="btn btn-outline-danger" onClick={() => removeUser(o, user.id)}>
                                    <FontAwesomeIcon icon="ban" />
                                </button> :
                                ""
                        }

                    </td>
                }
                <td className="text-left">
                    <div className="name-col" onClick={() => toogle(o, user.id)}>
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
                    {!raids[o].isLeader ?
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
                    <td colSpan={12} className="text-left">
                        <Nav tabs className="my-1">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: state.activeTab === 1 })}
                                    onClick={() => { changeTab(1); }}>
                                    Character Data
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: state.activeTab === 2 })}
                                    onClick={() => { changeTab(2); }}>
                                    Needs
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: state.activeTab === 3 })}
                                    onClick={() => { changeTab(3); }}>
                                    Parse
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: state.activeTab === 4 })}
                                    onClick={() => { changeTab(4); }}>
                                    Info
                                    </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={state.activeTab}>
                            <TabPane tabId={1} className="bg-dark">
                                <CharacterDataSearch name={user.name} region={region} isMain={user.isMain} isBadge={isBadge} />
                            </TabPane>
                            <TabPane tabId={2} className="bg-dark">

                            </TabPane>
                            <TabPane tabId={3} className="bg-dark">

                            </TabPane>
                            <TabPane tabId={4}>
                                {member.notes} <br />
                                User additional message <br />
                                Warnings
                                </TabPane>
                        </TabContent>
                    </td>
                </tr>
            }
        </tbody>

    );
})

