import * as React from 'react';

interface CharacterDataGearRowProps {
    gear: any;
    rank: any;
    img: any;
}

export class CharacterDataGearRow extends React.Component<CharacterDataGearRowProps> {
    render() {
        const { gear, img, rank } = this.props;
        return (
            <div>
                {gear} <br />
                {rank} <br />
                <img src={img} />
            </div>
        );
    }
}
