import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RaidTableHeader as Header } from './raidTableHeader';
import { RaidTableRow as Row } from './raidTableRow';

import { observer } from 'mobx-react';
import { store } from '../store/raidStore';

import '../scss/table.scss';

interface RaidProps {
    raid: any,
    index: any
}

interface RaidState {
    suggestions: any,

    selectedCharId: string,
    selectedCharName: string,
    selectedCharClass: string,
    selectedCharIsMain: boolean,
    selectedCharIsStatic: boolean,
    selectedCharHours: any
}

@observer
export class RaidTable extends React.Component<RaidProps, RaidState> {
    render() {
        const {
            raid,
            index
        } = this.props;
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
                                            <button className="btn btn-outline-success" onClick={() => store.addUser(index)}>
                                                <FontAwesomeIcon icon="save" />
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="chars"
                                                className="form-control"
                                                onChange={(e) => store.getSuggestions(e)}
                                                value={store.selectedCharName || ""}
                                            />
                                            {
                                                store.suggestions &&
                                                <div className="suggestions-box">
                                                    {store.suggestions.map((suggestion: any) => (
                                                        <a href="" onClick={(e) => store.selectChar(e, suggestion)}>{suggestion.name}<br /></a>
                                                    ))}
                                                </div>

                                            }
                                        </td>
                                        <td>
                                            {store.selectedCharClass}
                                        </td>
                                        <td colSpan={7}></td>
                                        <td>
                                            {store.selectedCharIsStatic != null ?
                                                <select
                                                    className="form-control"
                                                    onChange={(e) => store.selectIfStatic(e)}
                                                    defaultValue={store.selectedCharIsStatic ? "static" : "sub"}
                                                >
                                                    <option value="static"> Static </option>
                                                    <option value="sub"> Sub </option>
                                                </select>
                                                : ""
                                            }
                                        </td>
                                        <td>
                                            {store.selectedCharIsMain != null ? store.selectedCharIsMain ? "Main" : "Alt" : ""}
                                        </td>
                                    </tr>
                                </tbody>
                            }
                            {
                                raid.isEditMode &&
                                <tbody>
                                    <tr>
                                        <td colSpan={raid.isLeader ? 4 : 2}></td>
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

                            {raid.members.map((member: any) => (
                                store.users.map((user: any, index: any) => {
                                    if (member.id == user.id) {
                                        return (
                                            <Row
                                                o={this.props.index}
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
