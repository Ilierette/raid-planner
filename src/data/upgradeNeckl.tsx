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
    necklace: [
        {
            name: "VT Elemental Necklace",
            tier: "VT",
            stages: [
                {
                    name: "Stage - 3",
                    isActive: true,
                    jewel: 40,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    PTS: 2,
                    hqWings: 20,
                    soulstone: 560,
                    moonstone: 160,
                    sacred: 400,
                    elysian: 100,
                    gold: 100,
                    jewel: 40,
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    PTS: 2,
                    hqWings: 20,
                    soulstone: 560,
                    moonstone: 160,
                    sacred: 400,
                    elysian: 100,
                    gold: 100,
                    jewel: 40,
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                    PTS: 2,
                    hqWings: 20,
                    soulstone: 560,
                    moonstone: 160,
                    sacred: 400,
                    elysian: 100,
                    gold: 100,
                    jewel: 40,
                },
                {
                    name: "Awakened - 1",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    hqWings: 45,
                    silverScale: 5
                },
                {
                    name: "Awakened - 2",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    hqWings: 45,
                    silverScale: 5
                },
                {
                    name: "Awakened - 3",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    hqWings: 45,
                    silverScale: 5
                }
            ]
        },
        {
            name: "Prophecy",
            tier: "PVE",
            stages: [
                {
                    name: "Stage - 1",
                    seaGlass: 1,
                    rCrux: 1,
                },
                {
                    name: "Stage - 3",
                    isActive: true,
                    jewel: 40,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 100,
                    onyxScale: 7,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    jewel: 40
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 100,
                    onyxScale: 7,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    jewel: 40
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                    gold: 100,
                    onyxScale: 7,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                },
                {
                    name: "Awakened - 1",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    onyxScale: 5
                },
                {
                    name: "Awakened - 2",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    onyxScale: 5
                },
                {
                    name: "Awakened - 3",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    onyxScale: 5
                }
            ]
        },
        ,
        {
            name: "Kingmaker",
            tier: "PVP",
            stages: [
                {
                    name: "Stage - 1",
                    bloodstone: 1,
                    rCrux: 1,
                },
                {
                    name: "Stage - 3",
                    isActive: true,
                    jewel: 40,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 100,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    bloodstone: 280,
                    jewel: 40
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 100,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    bloodstone: 280,
                    jewel: 40
                },
                {
                    name: "Stage - 10",
                    gold: 100,
                    soulstone: 185,
                    moonstone: 55,
                    sacred: 130,
                    elysian: 35,
                    bloodstone: 280
                },
                {
                    name: "Awakened - 1",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    bloodstone: 200
                },
                {
                    name: "Awakened - 2",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    bloodstone: 200
                },
                {
                    name: "Awakened - 3",
                    isActive: true,
                    gold: 150,
                    jewel: 15,
                    bloodstone: 200
                }
            ]
        }
    ]
}

export default upgrade