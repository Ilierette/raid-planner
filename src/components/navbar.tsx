import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';

interface NavbarState {
    dropdownOpen: boolean
}

export default class Navbar extends React.Component<NavbarState> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                    <FontAwesomeIcon icon={['fab', 'react']} />
                    <span className="ml-2 brand-name">BNS Raid Planner</span>
                </a>
                <div className="navbar-bar">
                    <ul className="navbar-nav">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon="bars" className="text-white" />
                            </a>
                        </li>
                    </ul>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle color="dark">
                            Letty
                            <FontAwesomeIcon icon="caret-down" className="text-white ml-3" />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                <FontAwesomeIcon icon="user" className="mr-2" />
                                My profile
                            </DropdownItem>
                            <DropdownItem>
                                <FontAwesomeIcon icon="comments" className="mr-2" />
                                Messages
                                <Badge color="success" pill className="ml-1">58</Badge>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <FontAwesomeIcon icon="cogs" className="mr-2" />
                                Account settings
                            </DropdownItem>
                            <DropdownItem>
                                <FontAwesomeIcon icon="power-off" className="mr-2" />
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>
        );
    }
}