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
    weapon: [
        {
            name: "Grand Celestial",
            tier: "TT",
            stages: [
                {
                    name: "Stage - 3",
                    isActive: true,
                    gold: 300,
                    PTS: 1,
                    empyrean: 5,
                    silverScale: 10,
					celestialSteel: 20,
                    soulstone: 400,
                    moonstone: 100
                },
                {
                    name: "Stage - 4",
                    isActive: true,
                    gold: 150,
                    PTS: 4,
                    TS: 40,
                    element: 35,
                    bloodPearl: 25,
                    soulstone: 480,
                    moonstone: 140,
                    sacred: 340,
                    elysian: 85,
					celestialSteel: 25
                },
                {
                    name: "Stage - 5",
                    isActive: true,
                    gold: 150,
                    PTS: 4,
                    TS: 40,
                    element: 35,
                    bloodPearl: 25,
                    soulstone: 480,
                    moonstone: 140,
                    sacred: 340,
                    elysian: 85,
					celestialSteel: 25
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 150,
                    PTS: 4,
                    TS: 40,
                    element: 35,
                    bloodPearl: 25,
                    soulstone: 480,
                    moonstone: 140,
                    sacred: 340,
                    elysian: 85,
					celestialSteel: 25
                },
                {
                    name: "Stage - 7",
                    isActive: true,
                    gold: 200,
                    PTS: 5,
                    element: 40,
                    bloodPearl: 30,
					onyxScale: 15,
                    soulstone: 500,
                    moonstone: 140,
                    sacred: 360,
                    elysian: 90,
					celestialSteel: 30
                },
                {
                    name: "Stage - 8",
                    isActive: true,
                    gold: 200,
                    PTS: 5,
                    element: 40,
                    bloodPearl: 30,
					onyxScale: 15,
                    soulstone: 500,
                    moonstone: 140,
                    sacred: 360,
                    elysian: 90,
					celestialSteel: 30
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 200,
                    PTS: 5,
                    element: 40,
                    bloodPearl: 30,
					onyxScale: 15,
                    soulstone: 500,
                    moonstone: 140,
                    sacred: 360,
                    elysian: 90,
					celestialSteel: 30
                }
            ]
        },
        {
            name: "Aransu",
            tier: "VT",
            stages: [
                {
                    name: "Stage - 3",
                    isActive: true,
                    gold: 250,
                    PTS: 1,
                    TS: 10,
                    empyrean: 2,
                    blackstone: 4,
                    aransuOrb: 40,
                    hqHearts: 8,
                    soulstone: 100,
                    moonstone: 50
                },
                {
                    name: "Stage - 4",
                    isActive: true,
                    gold: 100,
                    PTS: 1,
                    TS: 20,
                    element: 20,
                    aransuOrb: 30,
                    soulstone: 450,
                    moonstone: 130,
                    sacred: 320,
                    elysian: 80,
                    hqHearts: 20
                },
                {
                    name: "Stage - 5",
                    isActive: true,
                    gold: 100,
                    PTS: 1,
                    TS: 20,
                    element: 20,
                    aransuOrb: 30,
                    soulstone: 450,
                    moonstone: 130,
                    sacred: 320,
                    elysian: 80,
                    hqHearts: 20
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 100,
                    PTS: 1,
                    TS: 20,
                    element: 20,
                    aransuOrb: 30,
                    soulstone: 450,
                    moonstone: 130,
                    sacred: 320,
                    elysian: 80,
                    hqHearts: 20
                },
                {
                    name: "Stage - 7",
                    isActive: true,
                    gold: 120,
                    PTS: 2,
                    element: 30,
                    aransuOrb: 35,
                    silverScale: 15,
                    soulstone: 530,
                    moonstone: 150,
                    sacred: 380,
                    elysian: 95,
                    hqHearts: 30
                },
                {
                    name: "Stage - 8",
                    isActive: true,
                    gold: 120,
                    PTS: 2,
                    element: 30,
                    aransuOrb: 35,
                    silverScale: 15,
                    soulstone: 530,
                    moonstone: 150,
                    sacred: 380,
                    elysian: 95,
                    hqHearts: 30
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 120,
                    PTS: 2,
                    element: 30,
                    aransuOrb: 35,
                    silverScale: 15,
                    soulstone: 530,
                    moonstone: 150,
                    sacred: 380,
                    elysian: 95,
                    hqHearts: 30
                }
            ]
        },
        {
            name: "Raven", //and pre-raven
            tier: "VT",
            stages: [
                {
                    name: "Stage - 6",
                    isActive: true,
                    gold: 348,
                    voidFragments: 124,
                    ravenHeart: 12,
                    PTS: 1,
                    TS: 30,
                    empyrean: 1,
                    element: 35,
                    naryu: 49,
                    aransuOrb: 10,
                    soulstone: 1120,
                    moonstone: 292,
                    sacred: 760,
                    elysian: 193
                },
                {
                    name: "Stage - 7",
                    isActive: true,
                    gold: 50,
                    PTS: 1,
                    element: 15,
                    blackstone: 10,
                    soulstone: 250,
                    moonstone: 70,
                    sacred: 180,
                    elysian: 24
                },
                {
                    name: "Stage - 8",
                    isActive: true,
                    gold: 75,
                    PTS: 1,
                    element: 15,
                    blackstone: 10,
                    soulstone: 250,
                    moonstone: 70,
                    sacred: 180,
                    elysian: 45
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                    gold: 75,
                    PTS: 1,
                    element: 15,
                    blackstone: 10,
                    soulstone: 250,
                    moonstone: 70,
                    sacred: 180,
                    elysian: 45
                }
            ]
        }
    ]

}

export default upgrade