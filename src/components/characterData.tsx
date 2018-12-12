import * as React from 'react';
import { Card, CardBody, CardImg, CardHeader } from 'reactstrap';
import axios from 'axios';

import "../scss/characterData.scss";

import { CharacterDataRow } from './characterDataRow';

interface CharacterDataProps {
  name: string
}

interface CharacterDataState {
  items: []
}

export class CharacterData extends React.Component<CharacterDataProps, CharacterDataState> {
  constructor(props: any) {
    super(props)

    this.state = {
      items: []
    }
    axios.get('https://api.silveress.ie/bns/v3/character/full/eu/' + this.props.name).then(res => {
      this.setState({ items: res.data });
    })
  }
  render() {
    const { items } = this.state;
    return (
      <Card body inverse color="dark">
        <CardBody>
          <div className="row text-light">
            <div className="col-12">
              {items.accountName} [ {items.characterName} ]
              <p>
                {items.playerClass}  |  Level {items.playerLevel} &bull; HM Level  {items.playerLevelHM}  |  {items.faction} {items.factionRank}  |  {items.server}  |  {items.guild}
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-3">
              <div className="character-profile">
                <Card outline color="dark">
                  <CardImg src={items.characterImg} />
                </Card>
              </div>
            </div>
            <div className="col">
              <div className="card bg-dark character-stats attack">
                <CardHeader>
                  <h4>Attack Power</h4>
                  <h3>{items.ap}</h3>
                </CardHeader>
                <CharacterDataRow
                  id="piercing"
                  title="Piercing"
                  description="Rate"
                  description2=""
                  stat={items.piercing}
                  rate={items.piercingDefRate}
                  rate2=""
                />
                <CharacterDataRow
                  id="accuracy"
                  title="Accuracy"
                  description="Rate"
                  description2=""
                  stat={items.accuracy}
                  rate={items.accuracyRate}
                  rate2=""
                />
                <CharacterDataRow
                  id="critical"
                  title="Critical"
                  description="Rate"
                  description2=""
                  stat={items.crit}
                  rate={items.crit}
                  rate2=""
                />
                <CharacterDataRow
                  id="critDmg"
                  title="Critical Damage"
                  description="Rate"
                  description2=""
                  stat={items.critDamage}
                  rate={items.critDamageRate}
                  rate2=""
                />
                <div>
                  <button className="btn tab-button">
                    <span>
                      Additional damage
                  </span>
                    <span>
                      {items.extraDmg}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-dark character-stats defense">
                <CardHeader>
                  <h4>Health</h4>
                  <h3>{items.hp}</h3>
                </CardHeader>
                <CharacterDataRow
                  id="defense"
                  title="Defence"
                  description="Reduction"
                  description2=""
                  stat={items.defence}
                  rate={items.defenceDmgReduction}
                  rate2=""
                />
                <CharacterDataRow
                  id="evasion"
                  title="Evasion"
                  description="Rate"
                  description2=""
                  stat={items.evasion}
                  rate={items.evasionRate}
                  rate2=""
                />
                <CharacterDataRow
                  id="block"
                  title="Block"
                  description="Rate"
                  description2="Damage Reduction"
                  stat={items.block}
                  rate={items.blockRate}
                  rate2={items.blockDmgReduction}
                />
                <CharacterDataRow
                  id="critDef"
                  title="Critical Defense"
                  description="Reduction"
                  description2="Damage Reduction"
                  stat={items.critDef}
                  rate={items.critDefRate}
                  rate2={items.critDmgReduction}
                />
                <div>
                  <button className="btn tab-button">
                    <span>
                      Health Regen (in combat)
                  </span>
                    <span>
                      {items.regenInCombat}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div>
                {items.weaponName}<br />
                {items.gem1}<br />
                {items.gem2}<br />
                {items.gem3}<br />
                {items.gem4}<br />
                {items.gem5}<br />
                {items.gem6}<br />
              </div>
              <div>
                <br />{items.ringName}
              </div>
              <div>
                {items.earringName}
              </div>
              <div>
                {items.necklaceName}
              </div>
              <div>
                {items.beltName}
              </div>
              <div>
                {items.braceletName}
              </div>
              <div>
                {items.gloves}
              </div>
              <div>
                {items.soulName}
              </div>
              <div>
                {items.soulName2}
              </div>
              <div>
                {items.petAuraName}
              </div>
              <div>
                {items.soulBadgeName}
              </div>
              <div>
                {items.mysticBadgeName}
              </div>
              <div>
                {items.outfitName}
              </div>
              <div>
                {items.clothesAccessoryName}
              </div>
              <div>
                {items.hairName}
              </div>
              <div>
                {items.faceDecorationName}
              </div>
              <div>
                {items.soulshield1}<br />
                {items.soulshield2}<br />
                {items.soulshield3}<br />
                {items.soulshield4}<br />
                {items.soulshield5}<br />
                {items.soulshield6}<br />
                {items.soulshield7}<br />
                {items.soulshield8}
              </div>
            </div>
          </div>
        </CardBody>
      </Card >
    );
  }
}
