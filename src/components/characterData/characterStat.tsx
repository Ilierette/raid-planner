import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledCollapse } from 'reactstrap';

interface CharacterStatProps {
    id: string,
    title: string,
    stat: number,
    rate?: number,
    rate2?: number,
    description?: string,
    description2?: string
}

export const CharacterStat = ({ id, title, stat, rate, rate2, description, description2 }: CharacterStatProps) => {
    return (
        <div className="skill-tab">
            <button className="btn tab-button" id={id}>
                <span>
                    {title}:
                    </span>
                <span>
                    <span className="accent">
                        {stat}
                    </span>
                    <span className="skill-more">
                        {rate && <FontAwesomeIcon icon="caret-down" className="ml-2 my-auto" />}
                    </span>
                </span>
            </button>
            {
                rate &&
                <UncontrolledCollapse toggler={"#" + id}>
                    <div className="tab-data">
                        <span>
                            {title} {description}
                        </span>
                        <span>
                            {Math.floor(rate * 100)} %
                        </span>
                    </div>
                    {rate2 &&
                        <div className="tab-data">
                            <span>
                                {title} {description2}
                            </span>
                            <span>
                                {rate2}
                            </span>
                        </div>
                    }
                </UncontrolledCollapse>
            }
        </div>
    );
}

