import * as React from 'react';
import axios from 'axios';

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
      <div className="row">
        <div className="col">
          {console.log(items)}
          <div>
            <img src={items.characterImg} />
          </div>
          <div>
            {items.characterName}
          </div>
          <div>
            {items.accountName}
          </div>
          <div>
            {items.playerClass}
          </div>
          <div>
            Level {items.playerLevel} &bull; HM Level  {items.playerLevelHM}
          </div>
          <div>
            {items.server}
          </div>
          <div>
            {items.guild}
          </div>
        </div>
        <div className="col">
          <div>
            Attack Power: {items.ap}
          </div>
          <div>
            Piercing: {items.piercing} <br />
            Piercing Rate: {items.piercingDefRate}
          </div>
          <div>
            Accuracy {items.accuracy} <br />
            Accuracy Rate {items.accuracyRate}
          </div>
          <div>
            Critical {items.crit} <br />
            Critical Rate {items.critRate}
          </div>
          <div>
            Critical Damage {items.critDamage} <br />
            Critical Damage Rate {items.critDamageRate}
          </div>
          <div>
            Additional damage {items.extraDmg}
          </div>
          <div>

          </div>
          <div>
            {items.activeElement} Damage {items.frost} <br />
            {items.activeElement} Rate {items.frostRate}
          </div>
        </div>
        <div className="col">
          <div>
            Health: {items.hp}
          </div>
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
        <div className="col">
          <div>
            {items.weaponName}<br/>
            {items.gem1}<br/>
            {items.gem2}<br/>
            {items.gem3}<br/>
            {items.gem4}<br/>
            {items.gem5}<br/>
            {items.gem6}<br/>
          </div>
          <div>
          <br/>{items.ringName}
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
            {items.soulshield1}<br/>
            {items.soulshield2}<br/>
            {items.soulshield3}<br/>
            {items.soulshield4}<br/>
            {items.soulshield5}<br/>
            {items.soulshield6}<br/>
            {items.soulshield7}<br/>
            {items.soulshield8}
          </div>
        </div>
      </div>
    );
  }
}
