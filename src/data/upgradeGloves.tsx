/* 
    Mats Ids:
        "elysian"       |   "sacred"        |   "moonstone"     |   "soulstone"
        "petPod"        |   "sacredOil"
        "PTS"
        "TS"
        "empyrean"
        "jewel"         |   "element"
        "bCrux"         |   "rCrux"
        "pristine"
        "ravenFeather"  |   "hqWings"       |   "celestialWings"
        "ravenHeart"    |   "hqHearts"      |   "celestialSteel"
        "aransuOrb"     |   "bloodPearl"    |   "skyshadowOrb"
        "voidFragments" |   "seaGlass"      |   "warforge"
        "blackstone"    |   "silverScale"   |   "onyxScale"

        "bloodstone"    |   "incrinerator"
        "vegeneance"
        "dgs"
        "naryu"

    tier: 
        et
        tt
        bt
        pvp

    types of grear & their stages:
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
        mystic badge - awa 1-8

    flags:
        isActive - to select which gear appear on table
*/

const upgrade = {
    gloves: [
        {
            name: "King",
            tier: "PVE",
            stages: [
                {
                    name: "Stage - 1",
                    isActive: true,
                    gold: 100,
                    PTS: 2,
                    blackstone: 4,
                    soulstone: 420,
                    moonstone: 120,
                    sacred: 300,
                    elysian: 75
                },
                {
                    name: "Stage - 3",
                    isActive: true,
                    gold: 0
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 100,
                    blackstone: 3,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 100,
                    blackstone: 3,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                    gold: 100,
                    blackstone: 3,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    pristine: 1
                },
                {
                    name: "Awakened - 1",
                    isActive: true,
                    gold: 70,
                    blackstone: 5
                },
                {
                    name: "Awakened - 2",
                    isActive: true,
                    gold: 70,
                    blackstone: 5
                },
                {
                    name: "Awakened - 3",
                    isActive: true,
                    gold: 70,
                    blackstone: 5
                }
            ]
        },
        {
            name: "Starfire",
            tier: "PVP",
            stages: [
                {
                    name: "Stage - 1",
                    isActive: true,
                    gold: 0,
                    rCrux: 1,
                    bloodstone: 1
                },
                {
                    name: "Stage - 3",
                    isActive: true,
                    gold: 0,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 100,
                    bloodstone: 120,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 100,
                    bloodstone: 120,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                    gold: 100,
                    bloodstone: 120,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    pristine: 1
                },
                {
                    name: "Awakened - 1",
                    isActive: true,
                    gold: 70,
                    jewel: 15,
                    bloodstone: 200
                },
                {
                    name: "Awakened - 2",
                    isActive: true,
                    gold: 70,
                    jewel: 15,
                    bloodstone: 200
                },
                {
                    name: "Awakened - 3",
                    isActive: true,
                    gold: 70,
                    jewel: 15,
                    bloodstone: 200
                }
            ]
        }
    ]
}

export default upgrade