import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class RaidTableHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th rowSpan={2}>
                        <button
                            className="btn btn-outline-primary">
                            <FontAwesomeIcon icon="plus" />
                        </button>
                    </th>
                    <th rowSpan={2}>LP</th>
                    <th rowSpan={2}>*</th>
                    <th rowSpan={2} className="text-left">Character</th>
                    <th rowSpan={2} className="text-left">Name</th>
                    <th colSpan={7}>Sign up</th>
                    <th colSpan={2}>Activity Status</th>
                    <th rowSpan={2}> Notes</th>
                </tr>
                <tr>
                    <th>Środa</th>
                    <th>Czwartek</th>
                    <th>Piatek</th>
                    <th>Sobota</th>
                    <th>Niedziela</th>
                    <th>Poniedziałek</th>
                    <th>Wtorek</th>
                    <th>Static</th>
                    <th>Main</th>
                </tr>
            </thead>
        );
    }
}
