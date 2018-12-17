import * as React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterData } from './characterData'

interface RaidCharacterDataProps {
    modal: boolean,
    name: string,
    toogle: (e: any, user: any) => void
}

export default class RaidCharacterData extends React.Component<RaidCharacterDataProps>{

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toogle} className="modal-lg">
                    <ModalBody>
                        <div className="modal-button-container">
                            <a href="#" className="modal-toogle-button" onClick={this.props.toogle}>
                                <FontAwesomeIcon icon="times" />
                            </a>
                        </div>
                        <CharacterData name={this.props.name} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}