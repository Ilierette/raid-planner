import * as React from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import classnames from 'classnames';
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CharacterDataSearch } from '../../components/characterDataSearch';
import { Member, Day } from '../../models/interfaces';
import RaidStore from '../../store/raidStore'
import { db } from '../../store/config';

interface props {
    isLeader: boolean
    member: Member,
}

export const RaidRow = observer(({ isLeader, member }: props) => {
    const { isBadge, uid } = React.useContext(RaidStore)
    const state = useObservable({
        activeTab: 1,
        isExpanded: false
    })

    const memberData = useObservable({
        name: "",
        class: "",
        isMain: false,
        region: ""
    })

    const changeTab = (tab: any) => {
        if (state.activeTab !== tab) {
            state.activeTab = tab
        }
    }
    const toogle = () => {
        state.isExpanded = !state.isExpanded
    }
    const removeUser = () => {
        // const index = this.raids[id].members.findIndex((m: any) => m.id == userId);
        // const all = this.raids[id].members

        // if (index > -1) {
        //     all.splice(index, 1);
        // }
        // this.raids[id].members = all
    }

    React.useEffect(()=>{
        db.collection('users').doc(member.id).onSnapshot((snap)=>{
            memberData.name = snap.data().name;
            memberData.class = snap.data().class;
            memberData.isMain = snap.data().isMain;
            memberData.region = snap.data().region;
        })
    },[])

    return (
        <tbody key={member.id}>
            <tr >
                {isLeader &&
                    <td>
                        {
                            member.id != uid ?
                                <button
                                    className="btn btn-outline-danger" onClick={() => removeUser()}>
                                    <FontAwesomeIcon icon="ban" />
                                </button> :
                                ""
                        }

                    </td>
                }
                <td className="text-left">
                    <div className="name-col" onClick={() => toogle()}>
                        <abbr title="Click to check character data">
                            {memberData.name}
                        </abbr>
                        <FontAwesomeIcon icon="caret-down" className="ml-3" />
                    </div>
                </td>
                <td className="text-left">
                    {memberData.class}
                </td>
                {member.days.map((day: Day, index: number) => (
                    <td key={index}>
                        {day.min} - {day.max}
                    </td>
                ))}
                <td className="form-group">
                    {!isLeader ?
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
                    {memberData.isMain ? "main" : "alt"}
                </td>

            </tr>
            {
                state.isExpanded &&
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
                                <CharacterDataSearch name={memberData.name} region={memberData.region} isMain={memberData.isMain} isBadge={isBadge} />
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

