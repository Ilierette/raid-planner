import * as React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterData } from './characterData'

interface RaidCharacterDataProps {
    modal: boolean,
    name: string,
    region: string,
    isMain: boolean,
    isBadge: boolean,
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
                        <CharacterData 
                            name={this.props.name} region={this.props.region} 
                            isMain={this.props.isMain} isBadge={this.props.isBadge}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}