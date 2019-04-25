import * as React from 'react';

interface CharacterDataGearRowProps {
    displayName: string,
    name: string,
    rank: string,
    type: string,
    img: string
}

export const CharacterDataGearRow = ({ name, img, rank, type, displayName }: CharacterDataGearRowProps) => {
    return (
        <div className={"equip-item " + type}>
            <div className="item-img">
                {img ? <img src={img} /> : <div className="empty"></div>}
            </div>
            <div className={rank ? "rank rank-" + rank : "rank rank-1"}>
                {name ? name : displayName}
            </div>
        </div>
    )
}
