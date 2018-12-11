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
    heart: [
        {
            name: "Heart",
            tier: "other",
            stages: [
                {
                    name: "True Hongmoon",
                    isActive: true,
                    gold: 245,
                    voidFragments: 20,
                    aransuOrb: 135,
                    soulstone: 1625,
                    moonstone: 445,
                    sacred: 1180,
                    elysian: 294
                },
                {
                    name: "Virtuos - 5",
                    isActive: true,
                    gold: 600,
                    blackstone: 25,
                    soulstone: 880,
                    moonstone: 240,
                    sacred: 640,
                    elysian: 160,
                    sacredOil: 16
                },
                {
                    name: "Awakened Virtuos - 1",
                    isActive: true,
                    gold: 200,
                    soulstone: 220,
                    moonstone: 60,
                    sacred: 160,
                    elysian: 40,
                    sacredOil: 4
                },
                {
                    name: "Awakened Virtuos - 2",
                    isActive: true,
                    gold: 200,
                    soulstone: 220,
                    moonstone: 60,
                    sacred: 160,
                    elysian: 40,
                    sacredOil: 4
                },
                {
                    name: "Awakened Virtuos - 3",
                    isActive: true,
                    gold: 200,
                    soulstone: 220,
                    moonstone: 60,
                    sacred: 160,
                    elysian: 40,
                    sacredOil: 5
                },
                {
                    name: "True Virtuos",
                    isActive: true,
                    gold: 300,
                    soulstone: 330,
                    moonstone: 90,
                    sacred: 240,
                    elysian: 60,
                    sacredOil: 6
                }
            ]

        }
    ]
}

export default upgrade