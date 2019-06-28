export interface Mats {
    isActive: boolean,
    isOutdated: boolean,
    id: string,
    name: string,
    tier: string,
    isTradeable: boolean,
    price?: number,
}

export interface Gear {
    id: string,
    type: string,
    tier: string,
    isActive: boolean,
    isOutdated: boolean,
    stages: Stage[]
}

export interface Stage {
    name: string,
    isActive: boolean,

    // mats ids
    elysian?: number,
    sacred?: number,
    moonstone?: number,
    soulstone?: number,
    petPod?: number,
    sacredOil?: number,
    pts?: number,
    ts?: number,
    empyrean?: number,
    jewel?: number,
    element?: number,
    bCrux?: number,
    rCrux?: number,
    pristine?: number,
    ravenFeather?: number,
    hqWings?: number,
    celestialWings?: number,
    ravenHeart?: number,
    hqHearts?: number,
    celestialSteel?: number,
    blackstone?: number,
    silverScale?: number,
    onyxScale?: number,
    bloodstone?: number,
    incrinerator?: number,
    vegeneance?: number,
    dgs?: number

}

export interface Raid {
    type: string,
    ratio: string,
    timestamp: string;
    maxMembers: number;
    members: Member[],

    isEditMode: boolean,
    isAddMode: boolean
    isLeader: boolean;
}

export interface Member {
    id: string,
    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
    notes: string,
    days: Day[]
}

export interface User {
    id: string,
    name: string,
    class: string,
    region: string,
    isMain: boolean,
}

export interface Day {
    date: string,
    min: string,
    max: string
}

export interface Mats {
    id: string,
    tier: string,
    name: string,
    price?: number
}

export interface UserMats {
    id: string,
    amount: number,
    totalAmount: number,
    totalPrice: number,
    show: boolean
}

export interface Tiers {
    name: string,
    show: boolean
}

export interface Gears {
    name: string,
    tier: string,
    // tier: et, tt, bt, pvp, other
    stages: Stages[]
    /* types of grear & their stages:
    weapon - s1
    ring - s3, awa-3
    earring - s3, awa-3
    necklace - s3, awa-3
    bracelet - s3, awa-3
    belt - s3, awa-3
    gloves - s3, awa-3
    soul - s1
    heart - s1
    pet - s1
    soul badge - awa 1-8
    mystic badge - awa 1-8 */
}

export interface Stages {
    name: string,
    isActive: boolean,

    // mats ids
    elysian?: number,
    sacred?: number,
    moonstone?: number,
    soulstone?: number,
    petPod?: number,
    sacredOil?: number,
    pts?: number,
    ts?: number,
    empyrean?: number,
    jewel?: number,
    element?: number,
    bCrux?: number,
    rCrux?: number,
    pristine?: number,
    ravenFeather?: number,
    hqWings?: number,
    celestialWings?: number,
    ravenHeart?: number,
    hqHearts?: number,
    celestialSteel?: number,
    blackstone?: number,
    silverScale?: number,
    onyxScale?: number,
    bloodstone?: number,
    incrinerator?: number,
    vegeneance?: number,
    dgs?: number
}

export interface Character {
    class: string,
    name: string,
    lvl: string,
    lvlHM: string,
    server: string,
    faction: string,
    factionRank: string,
    guild: string,
    activeElement: string,
    img: string,
    ap: string,
    offensive: Stats[],
    hp: string,
    defensive: Stats[],
    equipment: Equipments[],
}

export interface Stats {
    id: string,
    title: string,
    stat: number,
    rate?: number,
    rate2?: number,
    description?: string,
    description2?: string
}

export interface Equipments {
    name: string,
    displayName: string,
    rank?: string,
    type?: string,
    img?: string
}