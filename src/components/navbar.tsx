import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">BNS Raid Planner</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">
                            <FontAwesomeIcon icon={faPowerOff}/>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}