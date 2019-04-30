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