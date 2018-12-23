import * as React from 'react';
import { Card, CardBody, CardFooter, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidTableHeader as Header } from './raidTableHeader';

import users from '../data/users';

import '../scss/table.scss'
import RaidCharacterData from './raidCharacterData';

interface RaidProps {
    raid: []
}

interface RaidState {
    users: [],
    selected: string,
    modal: boolean,
    isMain: boolean,
    region: string
}

export class RaidTable extends React.Component<RaidProps, RaidState> {
    constructor(props: any) {
        super(props)

        this.state = {
            users: users.users,
            region: "eu",
            selected: "",
            isMain: true,
            modal: false
        }
    }
    toogle = (e:any, user:any) => {
        e.preventDefault;
        this.setState({
            modal: !this.state.modal,
            selected: user
        });
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <h5 className="card-title">{this.props.raid.type}</h5>
                    <div className="table-responsive">
                        <table className="table table-sm text-center">
                            <Header />
                            <tbody>
                                {this.props.raid.members.map((member: any) => (
                                    this.state.users.map((user: any, index: any) => {
                                        if (member.id == user.id) {
                                            return (
                                                <tr key={user.id}>
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
                                                        <a href="#" className="text-dark" onClick={(e:any) => this.toogle(e, user.name)}>
                                                            {user.name}
                                                        </a>
                                                    </td>
                                                    <td className="text-left">
                                                        {user.class}
                                                    </td>
                                                    {user.days.map((day: any, index: any) => (
                                                        <td key={index}>{day.min} - {day.max}</td>
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
                                                    <td>{member.notes}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="row">
                        <div className="col-2 my-auto">
                            {this.props.raid.members.length}/{this.props.raid.maxMembers}
                        </div>
                        <div className="col text-right">
                            <Button color="primary" >Set raid time</Button>
                            <Button color="success" className="ml-1">Save changes</Button>
                        </div>
                    </div>
                </CardFooter>

                <RaidCharacterData 
                    modal={this.state.modal} toogle={this.toogle} 
                    name={this.state.selected} region={this.state.region} isMain={this.state.isMain} isBadge={true}
                />
            </Card>
        );
    }
}
