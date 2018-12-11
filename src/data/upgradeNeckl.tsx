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
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                }
            ]
        },
        {
            name: "Prophecy",
            tier: "PVE",
            stages: [
                {
                    name: "Stage - 3",
                    isActive: true,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                }
            ]
        },
        ,
        {
            name: "Kingmaker",
            tier: "PVP",
            stages: [
                {
                    name: "Stage - 3",
                    isActive: true,
                },
                {
                    name: "Stage - 6",
                    isActive: true,
                },
                {
                    name: "Stage - 9",
                    isActive: true,
                },
                {
                    name: "Stage - 10",
                    isActive: true,
                }
            ]
        }
    ]
}

export default upgrade