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
    soul: [
        {
            name: "Soul",
            tier: "other",
            stages: [
                {
                    name: "True Acending",
                    isActive: true,
                    gold: 330,
                    voidFragments: 130,
                    sacredOil: 28,
                    TS: 60
                },
                {
                    name: "True Cosmic",
                    isActive: true,
                    sacredOil: 66,
                    aransuOrb: 87
                },
                {
                    name: "Awakened Tiger - 1",
                    isActive: true,
                    sacredOil: 48,
                    bloodPearl: 34
                },
                {
                    name: "Awakened Tiger - 2",
                    isActive: true,
                    sacredOil: 20,
                    bloodPearl: 15
                },
                {
                    name: "Awakened Tiger - 3",
                    isActive: true,
                    sacredOil: 24,
                    bloodPearl: 18
                },
                {
                    name: "True Tiger",
                    isActive: true,
                    sacredOil: 24,
                    bloodPearl: 18
                }
            ]

        }
    ]
}

export default upgrade