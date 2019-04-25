import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const CharacterSelect = () => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle color="outline-light">
                Select your character
                    <FontAwesomeIcon icon="caret-down" className="text-white ml-3" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>
                    Letty
                    </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <FontAwesomeIcon icon="plus" className="fa-xs mr-1" />
                    Add character
                    </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}
