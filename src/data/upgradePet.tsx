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
    pet: [
        {
            name: "Pet",
            tier: "other",
            stages: [
                {
                    name: "Unleashed Hongmoon",
                    isActive: true,
                    moonstone: 30,
                    soulstone: 300,
                    gold: 130
                },
                {
                    name: "Ultimate - 1",
                    isActive: true,
                    gold: 20,
                    petPod: 8 
                },
                {
                    name: "Ultimate - 2",
                    isActive: true,
                    gold: 20,
                    petPod: 10 
                },
                {
                    name: "Ultimate - 3",
                    isActive: true,
                    gold: 20,
                    petPod: 10 
                },
                {
                    name: "Ultimate - 4",
                    isActive: true,
                    gold: 20,
                    petPod: 10 
                },
                {
                    name: "Ultimate - 5",
                    isActive: true,
                    gold: 20,
                    petPod: 10 
                },
                {
                    name: "Awakened Ultimate - 1",
                    isActive: true,
                    gold: 55,
                    petPod: 13 
                },
                {
                    name: "Awakened Ultimate - 2",
                    isActive: true,
                    gold: 55,
                    petPod: 20 
                },
                {
                    name: "Awakened Ultimate - 3",
                    isActive: true,
                    gold: 55,
                    petPod: 30 
                },
                {
                    name: "Unleashed Ultimate",
                    isActive: true,
                    gold: 200,
                    petPod: 60 
                },
                {
                    name: "Alpha - Stage 1",
                    isActive: true,
                    gold: 50,
                    petPod: 12 
                },
                {
                    name: "Alpha - Stage 2",
                    isActive: true,
                    gold: 50,
                    petPod: 15 
                },
                {
                    name: "Alpha - Stage 3",
                    isActive: true,
                    gold: 50,
                    petPod: 15 
                },
                {
                    name: "Alpha - Stage 4",
                    isActive: true,
                    gold: 50,
                    petPod: 15 
                },
                {
                    name: "Alpha - Stage 5",
                    isActive: true,
                    gold: 50,
                    petPod: 15 
                },
                {
                    name: "Awakened Alpha - Stage 1",
                    isActive: true,
                    gold: 50,
                    petPod: 20 
                },
                {
                    name: "Awakened Alpha - Stage 1",
                    isActive: true,
                    gold: 50,
                    petPod: 30 
                },
                {
                    name: "Awakened Alpha - Stage 1",
                    isActive: true,
                    gold: 50,
                    petPod: 45 
                },
                {
                    name: "Uleashed Alpha",
                    isActive: true,
                    gold: 50,
                    petPod: 45 
                }
            ]

        }
    ]
}

export default upgrade