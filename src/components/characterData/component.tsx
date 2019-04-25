import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { CharacterStat } from './characterStat';
import { CharacterGear } from './characterGear';
import { Equipments } from '../../models/interfaces';
import "../../scss/characterData.scss";
import GlobalStore from '../../store/globalStore'

interface props {
  isMain: boolean,
  isBadge: boolean
}

export const CharacterData = observer(({ isMain, isBadge }: props) => {
  const { char, isLoadingData } = React.useContext(GlobalStore)

  return (
    <div className="card bg-dark text-white char-data mx-auto">
      {isLoadingData ? (
        <div className="loader"></div>
      ) :
        <div className="card-body">
          <div className="row text-light">
            {char.class && <div className={"class ml-3 " + char.class.toLowerCase().replace(/ /g, '')}></div>}
            <div className="col">
              <span className="char-name"><strong>{char.name}</strong></span>
              {isBadge &&
                <span>
                  {isMain ? (
                    <span className="badge badge-primary ml-2 my-auto">Main</span>
                  ) : (
                      <span className="badge badge-secondary ml-2 my-auto">Alt</span>
                    )}
                </span>}
              <ul className="list-inline char-data-list mt-1">
                <li className="list-inline-item pl-0">{char.class}</li>
                <li className="list-inline-item">Level {char.lvl} &bull; {char.lvlHM} HM</li>
                <li className="list-inline-item">{char.server}</li>
                {char.faction && <li className="list-inline-item">{char.faction} {char.factionRank}</li>}
                {char.guild && <li className="list-inline-item">{char.guild}</li>}
                <li className="list-inline-item last">
                  <span className={"elements " + char.activeElement} >
                    {char.activeElement}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col pr-0 character-profile border-dark">
              <img src={char.img} className="card-img" />
            </div>
            <div className="col px-1">
              <div className="character-stats attack">
                <div className="stats-header">
                  <h3>
                    Attack Power <br />
                    <span className="accent">{char.ap}</span>
                  </h3>
                </div>
                <div className="split-point"></div>
                {char.offensive && char.offensive.map((o: any) => (
                  <CharacterStat
                    key={o.id}
                    id={o.id}
                    title={o.title}
                    description={o.description}
                    description2={o.description2}
                    rate={o.rate}
                    rate2={o.rate2}
                    stat={o.stat}
                  />
                ))}
              </div>
            </div>
            <div className="col px-1">
              <div className="character-stats defense">
                <div className="stats-header">
                  <h3>
                    Health <br />
                    <span className="accent">{char.hp}</span>
                  </h3>
                </div>
                <div className="split-point"></div>
                {char.defensive && char.defensive.map((o: any) => (
                  <CharacterStat
                    key={o.id}
                    id={o.id}
                    title={o.title}
                    description={o.description}
                    description2={o.description2}
                    rate={o.rate}
                    rate2={o.rate2}
                    stat={o.stat}
                  />
                ))}
              </div>
            </div>
            <div className="col-4 pl-4">
              <div className="card bg-dark ">
                {
                  char.equipment && char.equipment.map((item: Equipments, index: number) => (
                    <CharacterGear
                      displayName={item.displayName}
                      key={index}
                      type={item.type}
                      name={item.name}
                      rank={item.rank}
                      img={item.img}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  );
})

