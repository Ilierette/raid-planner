import { observable } from 'mobx';
import { belt } from '../data/upgradeBelt';
import { bracelet } from '../data/upgradeBracelet';
import { earring } from '../data/upgradeEarring';
import { gloves } from '../data/upgradeGloves';
import { soulBadge } from '../data/upgradeSoulBadge';
import { necklace } from '../data/upgradeNeckl';
import { soul } from '../data/upgradeSoul';
import { ring } from '../data/upgradeRing';
import { pet } from '../data/upgradePet';
import { mysticBadge } from '../data/upgradeMysticBadge';
import { heart } from '../data/upgradeHeart';
import { weapon } from '../data/upgradeWeapon';

export const gear = observable({
    belt: belt,
    bracelet: bracelet,
    earring: earring,
    gloves: gloves,
    soulBadge: soulBadge,
    necklace: necklace,
    soul: soul,
    ring: ring,
    pet: pet,
    mysticBadge: mysticBadge,
    heart: heart,
    weapon: weapon,
})

export const increase = () => {
    gear.weapon[0].name += 1; 
}


