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
    weapon: [
        {
            name: "Grand Celestial",
            tier: "TT",
            stages: [
                {
                    name: "Stage - 3",
                },
                {
                    name: "Stage - 4",
                },
                {
                    name: "Stage - 5",
                },
                {
                    name: "Stage - 6",
                    gold: 450,
                    elysian: 255,
                    sacred: 1020,
                    moonstone: 420,
                    soulstone: 1440,
                    PTS: 12,
                    TS: 120,
                    element: 105,
                    bloodPearl: 75,
                    celestialSteel: 75
                },
                {
                    name: "Stage - 7",
                },
                {
                    name: "Stage - 8",
                },
                {
                    name: "Stage - 9",
                }
            ]
        },
        {
            name: "Aransu",
            tier: "VT",
            stages: [
                {
                    name: "Stage - 3",
                },
                {
                    name: "Stage - 4",
                },
                {
                    name: "Stage - 5",
                },
                {
                    name: "Stage - 6",
                },
                {
                    name: "Stage - 7",
                },
                {
                    name: "Stage - 8",
                },
                {
                    name: "Stage - 9",
                }
            ]
        },
        {
            name: "Raven", //and pre-raven
            tier: "VT",
            stages: [
                {
                    name: "Stage - 3",
                },
                {
                    name: "Stage - 4",
                },
                {
                    name: "Stage - 5",
                },
                {
                    name: "Stage - 6",
                },
                {
                    name: "Stage - 7",
                },
                {
                    name: "Stage - 8",
                },
                {
                    name: "Stage - 9",
                }
            ]
        }
    ]

}

export default upgrade