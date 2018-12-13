import * as React from 'react';
import { Card, CardBody, CardImg, CardHeader } from 'reactstrap';
import axios from 'axios';

import "../scss/characterData.scss";

import { CharacterDataRow } from './characterDataRow';
import { CharacterDataGearRow } from './characterDataGearRow';

import character from '../data/characterDataState'

interface CharacterDataProps {
  name: string
}

interface CharacterDataState {
  char: any,
  character: [],
  items: [],
}

export class CharacterData extends React.Component<CharacterDataProps, CharacterDataState> {
  constructor(props: any) {
    super(props)

    this.state = {
      char: character,

      character: [],
      items: [],

    }
  }
  componentDidMount() {
    axios.get('https://api.silveress.ie/bns/v3/character/full/eu/' + this.props.name).then(res => {
      this.setState({
        character: res.data,
        char: {
          ap: res.data.ap,
          img: res.data.characterImg,
          piercing: {
            ...this.state.char.piercing,
            stat: res.data.piercing,
            rate: res.data.piercingDefRate,
          },
          accuracy: {
            ...this.state.char.accuracy,
            stat: res.data.accuracy,
            rate: res.data.accuracyRate,
          },
          critical:{
            ...this.state.char.critical,
            stat: res.data.crit,
            rate: res.data.critRate,
          },
          criticalDmg:{
            ...this.state.char.criticalDmg,
            stat: res.data.critDamage
          },
          additionalDmg: res.data.extraDmg
        },
        

      });
    })
    axios.get('https://api.silveress.ie/bns/v3/equipment/new').then(res => {
      this.setState({ items: res.data });
    })
  }

  render() {
    const { character, items, char } = this.state;
    return (
      <Card body inverse color="dark">
        <CardBody>
          {console.log(this.state.char)}
          <div className="row text-light">
            <div className="col-12">
              {character.accountName} [ {character.characterName} ]
              <p>
                {character.playerClass}  |  Level {character.playerLevel} &bull; HM Level  {character.playerLevelHM}  |  {character.faction} {character.factionRank}  |  {character.server}  |  {character.guild}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-3">
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
                <CharacterDataRow
                  id={char.piercing.id}
                  title={char.piercing.title}
                  description={char.piercing.description}
                  description2={char.piercing.description2}
                  stat={char.piercing.stat}
                  rate={char.piercing.rate}
                  rate2={char.piercing.rate2}
                />
                
                <div>
                  <button className="btn tab-button">
                    <span>
                      Additional damage
                  </span>
                    <span>
                      {char.additionalDmg}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-dark character-stats defense">
                <CardHeader>
                  <h4>Health</h4>
                  <h3>{character.hp}</h3>
                </CardHeader>
                <CharacterDataRow
                  id="defense"
                  title="Defence"
                  description="Reduction"
                  description2=""
                  stat={character.defence}
                  rate={character.defenceDmgReduction}
                  rate2=""
                />
                <CharacterDataRow
                  id="evasion"
                  title="Evasion"
                  description="Rate"
                  description2=""
                  stat={character.evasion}
                  rate={character.evasionRate}
                  rate2=""
                />
                <CharacterDataRow
                  id="block"
                  title="Block"
                  description="Rate"
                  description2="Damage Reduction"
                  stat={character.block}
                  rate={character.blockRate}
                  rate2={character.blockDmgReduction}
                />
                <CharacterDataRow
                  id="critDef"
                  title="Critical Defense"
                  description="Reduction"
                  description2="Damage Reduction"
                  stat={character.critDef}
                  rate={character.critDefRate}
                  rate2={character.critDmgReduction}
                />
                <div>
                  <button className="btn tab-button">
                    <span>
                      Health Regen (in combat)
                  </span>
                    <span>
                      {character.regenInCombat}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-dark ">
                <div>
                  {
                    items.map((item: any) => {
                      if (character.weaponName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.weaponName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.ringName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.ringName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.earringName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.earringName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.necklaceName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.necklaceName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.beltName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.beltName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.braceletName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.braceletName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.gloves == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.gloves}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.soulName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.soulName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.soulName2 == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.soulName2}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.petAuraName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.petAuraName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.soulBadgeName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.soulBadgeName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.mysticBadgeName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.mysticBadgeName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.outfitName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.outfitName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.clothesAccessoryName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.clothesAccessoryName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.hairName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.hairName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                  {
                    items.map((item: any) => {
                      if (character.faceDecorationName == item.name) {
                        return (
                          <CharacterDataGearRow
                            gear={character.faceDecorationName}
                            rank={item.rank}
                            img={item.img}
                          />
                        )
                      }
                    })
                  }
                </div>
              </div>

              <div>
                {character.gem1}<br />
                {character.gem2}<br />
                {character.gem3}<br />
                {character.gem4}<br />
                {character.gem5}<br />
                {character.gem6}<br />
              </div>
              <div>
                {character.soulshield1}<br />
                {character.soulshield2}<br />
                {character.soulshield3}<br />
                {character.soulshield4}<br />
                {character.soulshield5}<br />
                {character.soulshield6}<br />
                {character.soulshield7}<br />
                {character.soulshield8}
              </div>
            </div>
          </div>
        </CardBody>
      </Card >
    );
  }
}
