import * as React from 'react';

interface CharacterDataGearRowProps {
    displayName: string,
    name: string,
    rank: string,
    type: string,
    img: string
}

export class CharacterDataGearRow extends React.Component<CharacterDataGearRowProps> {
    render() {
        const { name, img, rank, type, displayName } = this.props;
        return (
            <div className={"equip-item " + type}>
                <div className="item-img">
                    {img ? <img src={img} /> : <div className="empty"></div>}
                </div>
                <div className={rank ? "rank rank-" + rank : "rank rank-1"}>
                    {name ? name : displayName}
                </div>
            </div>
        );
    }
}
