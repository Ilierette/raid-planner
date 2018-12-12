import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledCollapse } from 'reactstrap';

interface CharacterDataRowProps {
    id: string,
    title: string,
    stat: any,
    rate: any,
}

export class CharacterDataRow extends React.Component<CharacterDataRowProps> {
    render() {
        return (
            <div>
                <button className="btn tab-button" id={this.props.id}>
                    <span>
                        {this.props.title}:
                    </span>
                    <span>
                        {this.props.stat}
                        <FontAwesomeIcon icon="caret-down" className="ml-2 my-auto" />
                    </span>
                </button>
                <UncontrolledCollapse toggler={"#" + this.props.id} className="tab-data">
                    <span>
                        {this.props.title} Rate:
                    </span>
                    <span>
                        {this.props.rate}
                    </span>
                </UncontrolledCollapse>
            </div>
        );
    }
}
