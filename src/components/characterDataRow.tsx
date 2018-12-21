import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledCollapse } from 'reactstrap';

interface CharacterDataRowProps {
    id: string,
    title: string,
    description: string,
    description2: string,
    stat: any,
    rate: any,
    rate2: any,
}

export class CharacterDataRow extends React.Component<CharacterDataRowProps> {
    render() {
        return (
            <div className="skill-tab">
                <button className="btn tab-button" id={this.props.id}>
                    <span>
                        {this.props.title}:
                    </span>
                    <span>
                        <span className="accent">
                            {this.props.stat}
                        </span>
                        <span className="skill-more">
                            {this.props.rate && <FontAwesomeIcon icon="caret-down" className="ml-2 my-auto" />}
                        </span>
                    </span>
                </button>
                {
                    this.props.rate &&
                    <UncontrolledCollapse toggler={"#" + this.props.id}>
                        <div className="tab-data">
                            <span>
                                {this.props.title} {this.props.description}
                            </span>
                            <span>
                                {Math.floor(this.props.rate * 100)} %
                        </span>
                        </div>
                        {this.props.rate2 &&
                            <div className="tab-data">
                                <span>
                                    {this.props.title} {this.props.description2}
                                </span>
                                <span>
                                    {this.props.rate2}
                                </span>
                            </div>
                        }
                    </UncontrolledCollapse>
                }
            </div>
        );
    }
}
