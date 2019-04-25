import * as React from 'react';
import axios from 'axios';
import "../scss/characterData.scss";
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { user } from '../store/userStore';
import { Character, Equipments } from '../models/interfaces';
import { character } from '../data/character';
import { CharacterStat } from './characterData/characterStat';
import { CharacterGear } from './characterData/characterGear';

//TO DO - avoid duplicate code

interface CharacterDataProps {
  name: string,
  region: string,
  isMain: boolean,
  isBadge: boolean
}

interface CharacterDataState {
  char: Character[],
}

@observer
export class CharacterDataSearch extends React.Component<CharacterDataProps, CharacterDataState> {
  @observable char = character;

  componentDidMount() {
    user.isLoadingData = true;

    let getCharacter = axios.get('https://api.silveress.ie/bns/v3/character/full/' + this.props.region + '/' + this.props.name).then(res => {
      let activeElement = res.data.activeElement;
      if (activeElement == "Ice") {
        activeElement = "Frost";
      }
      const char = {
        ap: res.data.ap,
        hp: res.data.hp,
        name: res.data.accountName,
        displayName: res.data.characterName,
        class: res.data.playerClass,
        lvl: res.data.playerLevel,
        lvlHM: res.data.playerLevelHM,
        faction: res.data.faction,
        factionRank: res.data.factionRank,
        server: res.data.server,
        guild: res.data.guild,
        img: res.data.characterImg,
        activeElement: activeElement,
        offensive: [
          {
            id: "piercing",
            title: "Piercing",
            description: "Rate",
            stat: res.data.piercing,
            rate: res.data.piercingDefRate,
          },
          {
            id: "accuracy",
            title: "Accuracy",
            description: "Rate",
            stat: res.data.accuracy,
            rate: res.data.accuracyRate,
          },
          {
            id: "critical",
            title: "Critical",
            description: "Rate",
            stat: res.data.crit,
            rate: res.data.critRate,
          },
          {
            id: "criticalDmg",
            title: "Critical Damage",
            description: "Rate",
            stat: res.data.critDamage,
            rate: res.data.critDamageRate

          },
          {
            id: "extraDmg",
            title: "Additional Dmg",
            stat: res.data.extraDmg
          }
        ],
        defensive: [
          {
            id: "defense",
            title: "Defence",
            description: "Reduction",
            stat: res.data.defence,
            rate: res.data.defenceDmgReduction
          },
          {
            id: "evasion",
            title: "Evasion",
            description: "Rate",
            description2: "",
            stat: res.data.evasion,
            rate: res.data.evasionRate,
          },
          {
            id: "block",
            title: "Block",
            description: "Rate",
            description2: "Damage Reduction",
            stat: res.data.block,
            rate: res.data.blockRate,
            rate2: res.data.blockDmgReduction
          },
          {
            id: "critDef",
            title: "Critical Defense",
            description: "Reduction",
            description2: "Damage Reduction",
            stat: res.data.critDef,
            rate: res.data.critDefRate,
            rate2: res.data.critDmgReduction,

          },
          {
            id: "hpRegen",
            title: "Health Regen(in combat)",
            stat: res.data.regenInCombat
          }
        ],
        equipment: [
          {
            name: res.data.weaponName,
            displayName: "Weapon"
          },
          {
            name: res.data.ringName,
            displayName: "Ring"
          },
          {
            name: res.data.earringName,
            displayName: "Earring"
          },
          {
            name: res.data.necklaceName,
            displayName: "Necklace"
          },
          {
            name: res.data.beltName,
            displayName: "Belt"
          },
          {
            name: res.data.braceletName,
            displayName: "Bracelet"
          },
          {
            name: res.data.gloves,
            displayName: "Gloves"
          },
          {
            name: res.data.soulName,
            displayName: "Soul"
          },
          {
            name: res.data.soulName2,
            displayName: "Heart"
          },
          {
            name: res.data.petAuraName,
            displayName: "Pet Aura"
          },
          {
            name: res.data.soulBadgeName,
            displayName: "Soul Bagde"
          },
          {
            name: res.data.mysticBadgeName,
            displayName: "Mystic Badge"
          },
          {
            name: res.data.outfitName,
            displayName: "Costume"
          },
          {
            name: res.data.clothesAccessoryName,
            displayName: "Adorment"
          },
          {
            name: res.data.hairName,
            displayName: "Head Adorment"
          },
          {
            name: res.data.faceDecorationName,
            displayName: "Face Adorment"

          }
        ]
      }

      return char;
    })

    let getEQ = axios.get('https://api.silveress.ie/bns/v3/equipment/new').then(res => {
      const items = res.data;
      return items;
    })

    Promise.all([getCharacter, getEQ]).then((value) => {

      let char: any, eq: any;
      [char, eq] = value;

      const charEq = {
        ...char,
        equipment: char.equipment.map((c: Equipments) => {
          return ({
            displayName: c.displayName,
            name: c.name,
            rank: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.rank })[0],
            type: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.type })[0],
            img: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.img })[0]
          })
        })
      }
      user.isLoadingData = false
      this.char = charEq;
    })
  }

  render() {
    return (
      <div className="card bg-dark text-white char-data mx-auto">
        {user.isLoadingData ? (
          <div className="loader"></div>
        ) :
          <div className="card-body">
            <div className="row text-light">
              {this.char.class && <div className={"class ml-3 " + this.char.class.toLowerCase().replace(/ /g, '')}></div>}
              <div className="col">
                <span className="char-name"><strong>{this.char.name}</strong></span>
                {this.props.isBadge &&
                  <span>
                    {this.props.isMain ? (
                      <span className="badge badge-primary ml-2 my-auto">Main</span>
                    ) : (
                        <span className="badge badge-secondary ml-2 my-auto">Alt</span>
                      )}
                  </span>}
                <ul className="list-inline char-data-list mt-1">
                  <li className="list-inline-item pl-0">{this.char.class}</li>
                  <li className="list-inline-item">Level {this.char.lvl} &bull; {this.char.lvlHM} HM</li>
                  <li className="list-inline-item">{this.char.server}</li>
                  {this.char.faction && <li className="list-inline-item">{this.char.faction} {this.char.factionRank}</li>}
                  {this.char.guild && <li className="list-inline-item">{this.char.guild}</li>}
                  <li className="list-inline-item last">
                    <span className={"elements " + this.char.activeElement} >
                      {this.char.activeElement}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col pr-0 character-profile border-dark">
                <img src={this.char.img} className="card-img" />
              </div>
              <div className="col px-1">
                <div className="character-stats attack">
                  <div className="stats-header">
                    <h3>
                      Attack Power <br />
                      <span className="accent">{this.char.ap}</span>
                    </h3>
                  </div>
                  <div className="split-point"></div>
                  {this.char.offensive && this.char.offensive.map((o: any) => (
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
                      <span className="accent">{this.char.hp}</span>
                    </h3>
                  </div>
                  <div className="split-point"></div>
                  {this.char.defensive && this.char.defensive.map((o: any) => (
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
                    this.char.equipment && this.char.equipment.map((item: Equipments, index: number) => (
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
  }
}
