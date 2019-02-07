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

import { Gears } from '../models/interfaces';

interface GearStoreState {
    belt: Gears[],
    bracelet: Gears[],
    earring: Gears[],
    gloves: Gears[],
    soulBadge: Gears[],
    necklace: Gears[],
    soul: Gears[],
    ring: Gears[],
    pet: Gears[],
    mysticBadge: Gears[],
    heart: Gears[],
    weapon: Gears[],
}

class GearStore implements GearStoreState {
    @observable belt = belt;
    @observable bracelet = bracelet;
    @observable earring = earring;
    @observable gloves = gloves;
    @observable soulBadge = soulBadge;
    @observable necklace = necklace;
    @observable soul = soul;
    @observable ring = ring;
    @observable pet = pet;
    @observable mysticBadge = mysticBadge;
    @observable heart = heart;
    @observable weapon = weapon;

}

export const gear = new GearStore();