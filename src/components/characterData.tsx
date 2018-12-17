import * as React from 'react';
import { Card, CardBody, CardImg, CardHeader } from 'reactstrap';
import axios from 'axios';

import "../scss/characterData.scss";

import { CharacterDataRow } from './characterDataRow';
import { CharacterDataGearRow } from './characterDataGearRow';

interface CharacterDataProps {
  name: string
}

interface CharacterDataState {
  char: any,
  isLoadingData: boolean,
  isLoadingEQ: boolean
}

export class CharacterData extends React.Component<CharacterDataProps, CharacterDataState> {
  constructor(props: any) {
    super(props)

    this.state = {
      char: [],
      isLoadingData: true,
      isLoadingEQ: true,
    }
  }
  componentDidMount() {
    let getCharacter = axios.get('https://api.silveress.ie/bns/v3/character/full/eu/' + this.props.name).then(res => {
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
      this.setState({ char: char, isLoadingData: false });
      return char;
    })

    let getEQ = axios.get('https://api.silveress.ie/bns/v3/equipment/new').then(res => {
      const items = res.data;
      return items;
    })

    Promise.all([getCharacter, getEQ]).then((value) => {

      let char: any, eq: any;
      [char, eq] = value;

      this.setState(prevState => ({
        ...prevState,
        char: {
          ...char,
          equipment: char.equipment.map((c: any) => {
            return ({
              displayName: c.displayName,
              name: c.name,
              rank: eq.filter((e: any) => { return e.name == c.name }).map((e: any) => { return e.rank })[0],
              type: eq.filter((e: any) => { return e.name == c.name }).map((e: any) => { return e.type })[0],
              img: eq.filter((e: any) => { return e.name == c.name }).map((e: any) => { return e.img })[0]
            })
          })
        },
        isLoadingEQ: false
      }))
    })
  }


  render() {
    const { char, isLoadingData, isLoadingEQ } = this.state;
    return (
      <Card body inverse color="dark">
        {isLoadingData ? (
          <div className="loader"></div>
        ) :
          <CardBody>
            <div className="row text-light">
              <div className="col-12">
                {char.name} [ {char.displayName} ]
                <p>{char.class} | Level {char.lvl} &bull; {char.lvlHM} HM | {char.faction} {char.factionRank} | {char.server} | {char.guild}  </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-2">
                <div className="character-profile">
                  <Card outline color="dark">
                    <CardImg src={char.img} />
                  </Card>
                </div>
              </div>
              <div className="col">
                <div className="card bg-dark character-stats attack">
                  <CardHeader>
                    <h4>Attack Power</h4>
                    <h3>{char.ap}</h3>
                  </CardHeader>
                  {char.offensive && char.offensive.map((o: any) => (
                    <CharacterDataRow
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
              <div className="col">
                <div className="card bg-dark character-stats defense">
                  <CardHeader>
                    <h4>Health</h4>
                    <h3>{char.hp}</h3>
                  </CardHeader>
                  {char.defensive && char.defensive.map((o: any) => (
                    <CharacterDataRow
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
              <div className="col">
                {isLoadingEQ ? (
                  <div className="loader"></div>
                ) : (
                    <div className="card bg-dark ">
                      {
                        char.equipment && char.equipment.map((item: any, index: any) => (
                          <CharacterDataGearRow
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
                  )}
              </div>
            </div>
          </CardBody>
        }
      </Card >
    );
  }
}
