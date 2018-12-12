import * as React from 'react';
import { Card, CardBody, CardImg, CardHeader, Button, UncontrolledCollapse } from 'reactstrap';
import axios from 'axios';

import "../scss/characterData.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <CharacterDataRow id="piercing" title="Piercing" stat={items.piercing} rate={items.piercingDefRate} />
                <CharacterDataRow id="accuracy" title="Accuracy" stat={items.accuracy} rate={items.accuracyRate} />
                <CharacterDataRow id="critical" title="Critical" stat={items.crit} rate={items.crit} />
                <CharacterDataRow id="critDmg" title="Critical Damage" stat={items.critDamage} rate={items.critDamageRate} />
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
                <div>
                  Defence: {items.defence} <br />
                  Damage Reduction: {items.defenceDmgReduction}
                </div>
                <div>
                  Evasion: {items.evasion} <br />
                  Evasion rate: {items.evasionRate}
                </div>
                <div>
                  Block {items.block} <br />
                  Block Rate {items.blockRate}<br />
                  Block Damage Deduction {items.blockDmgReduction}
                </div>
                <div>
                  Critical Defense {items.critDef} <br />
                  Critical Reduction {items.critDefRate}<br />
                  Critical Damage Reduction {items.critDmgReduction}
                </div>
                <div>
                  Health Regen (in combat) {items.regenInCombat}
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
