import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { CharacterStat } from './characterStat';
import { CharacterGear } from './characterGear';
import { Equipments } from '../../models/interfaces';
import { user } from '../../store/userStore';
import "../../scss/characterData.scss";

interface props {
  isMain: boolean,
  isBadge: boolean
}

export const CharacterData = observer(({ isMain, isBadge }: props) => {
  return (
    <div className="card bg-dark text-white char-data mx-auto">
      {user.isLoadingData ? (
        <div className="loader"></div>
      ) :
        <div className="card-body">
          <div className="row text-light">
            {user.char.class && <div className={"class ml-3 " + user.char.class.toLowerCase().replace(/ /g, '')}></div>}
            <div className="col">
              <span className="char-name"><strong>{user.char.name}</strong></span>
              {isBadge &&
                <span>
                  {isMain ? (
                    <span className="badge badge-primary ml-2 my-auto">Main</span>
                  ) : (
                      <span className="badge badge-secondary ml-2 my-auto">Alt</span>
                    )}
                </span>}
              <ul className="list-inline char-data-list mt-1">
                <li className="list-inline-item pl-0">{user.char.class}</li>
                <li className="list-inline-item">Level {user.char.lvl} &bull; {user.char.lvlHM} HM</li>
                <li className="list-inline-item">{user.char.server}</li>
                {user.char.faction && <li className="list-inline-item">{user.char.faction} {user.char.factionRank}</li>}
                {user.char.guild && <li className="list-inline-item">{user.char.guild}</li>}
                <li className="list-inline-item last">
                  <span className={"elements " + user.char.activeElement} >
                    {user.char.activeElement}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col pr-0 character-profile border-dark">
              <img src={user.char.img} className="card-img" />
            </div>
            <div className="col px-1">
              <div className="character-stats attack">
                <div className="stats-header">
                  <h3>
                    Attack Power <br />
                    <span className="accent">{user.char.ap}</span>
                  </h3>
                </div>
                <div className="split-point"></div>
                {user.char.offensive && user.char.offensive.map((o: any) => (
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
                    <span className="accent">{user.char.hp}</span>
                  </h3>
                </div>
                <div className="split-point"></div>
                {user.char.defensive && user.char.defensive.map((o: any) => (
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
                  user.char.equipment && user.char.equipment.map((item: Equipments, index: number) => (
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

