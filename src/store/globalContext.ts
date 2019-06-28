import { createContext } from "react";
import { observable } from "mobx";
import { auth, db } from './firebase';
import { character } from "../data/character";
import axios from 'axios';
import { Equipments } from "../models/interfaces";

class GlobalContext {
    @observable isAuthUser = false;
    @observable isLoading = true;
    @observable user: any = null;
    @observable uid: any = null;
    @observable name: any = null;
    @observable region: any = null;
    @observable isMain: any = null;
    @observable needs: any = null;

    @observable isLoadingData = true;
    @observable char = character;

    @observable searchLoading = true;
    @observable searchChar = character;

    authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.isAuthUser = true;
                this.user = user;
                this.uid = user.uid;

                db.collection("users").doc(this.uid).get().then((doc) => {
                    if (doc.exists) {
                        this.name = doc.data().name;
                        this.region = doc.data().region;
                        this.isMain = doc.data().isMain;
                        this.needs = doc.data().needs;
                    }
                }).then(() => {
                    this.callApi(this.name, this.region, false);
                })
            }
            this.isLoading = false;
        })
    }

    logout = () => {
        event.preventDefault();
        auth.signOut();
        window.location.reload();
    }

    callApi = (name: string, region: string, search: boolean) => {
        if (search)
            this.searchLoading = true
        else
            this.isLoadingData = true;

        let getCharacter = axios.get('https://api.silveress.ie/bns/v3/character/full/' + region + '/' + name
        ).then(res => {
            let shortClass = res.data.playerClass;
            switch (shortClass) {
                case "Blade Master":
                    shortClass = "BM";
                    break;
                case "Destroyer":
                    shortClass = "DES";
                    break;
                case "Summoner":
                    shortClass = "SUM";
                    break;
                case "Force Master":
                    shortClass = "FM";
                    break;
                case "Kung Fu Master":
                    shortClass = "KFM";
                    break;
                case "Assassin":
                    shortClass = "SIN";
                    break;
                case "Blade Dancer":
                    shortClass = "BD"
                    break;
                case "Warlock":
                    shortClass = "WL";
                    break;
                case "Soul Fighter":
                    shortClass = "SF"
                    break;
                case "Gunslinger":
                    shortClass = "GUN";
                    break;
                case "Warden":
                    shortClass = "WAR";
                    break;
            }

            const char = {
                ap: res.data.ap,
                hp: res.data.hp,
                name: res.data.accountName,
                displayName: res.data.characterName,
                class: res.data.playerClass,
                shortClass: shortClass,
                lvl: res.data.playerLevel,
                lvlHM: res.data.playerLevelHM,
                faction: res.data.faction,
                factionRank: res.data.factionRank,
                server: res.data.server,
                guild: res.data.guild,
                img: res.data.characterImg,
                offensive: [
                    {
                        id: "piercing",
                        title: "Piercing",
                        description: "Rate",
                        stat: res.data.piercing,
                        rate: res.data.piercingDefRate,
                    },
                    {
                        id: "accuracy",
                        title: "Accuracy",
                        description: "Rate",
                        stat: res.data.accuracy,
                        rate: res.data.accuracyRate,
                    },
                    {
                        id: "critical",
                        title: "Critical",
                        description: "Rate",
                        stat: res.data.crit,
                        rate: res.data.critRate,
                    },
                    {
                        id: "criticalDmg",
                        title: "Critical Damage",
                        description: "Rate",
                        stat: res.data.critDamage,
                        rate: res.data.critDamageRate

                    },
                    {
                        id: "extraDmg",
                        title: "Additional Dmg",
                        stat: res.data.extraDmg
                    }
                ],
                defensive: [
                    {
                        id: "defense",
                        title: "Defence",
                        description: "Reduction",
                        stat: res.data.defence,
                        rate: res.data.defenceDmgReduction
                    },
                    {
                        id: "evasion",
                        title: "Evasion",
                        description: "Rate",
                        description2: "",
                        stat: res.data.evasion,
                        rate: res.data.evasionRate,
                    },
                    {
                        id: "block",
                        title: "Block",
                        description: "Rate",
                        description2: "Damage Reduction",
                        stat: res.data.block,
                        rate: res.data.blockRate,
                        rate2: res.data.blockDmgReduction
                    },
                    {
                        id: "critDef",
                        title: "Critical Defense",
                        description: "Reduction",
                        description2: "Damage Reduction",
                        stat: res.data.critDef,
                        rate: res.data.critDefRate,
                        rate2: res.data.critDmgReduction,

                    },
                    {
                        id: "hpRegen",
                        title: "Health Regen(in combat)",
                        stat: res.data.regenInCombat
                    }
                ],
                equipment: [
                    {
                        name: res.data.weaponName,
                        displayName: "Weapon"
                    },
                    {
                        name: res.data.ringName,
                        displayName: "Ring"
                    },
                    {
                        name: res.data.earringName,
                        displayName: "Earring"
                    },
                    {
                        name: res.data.necklaceName,
                        displayName: "Necklace"
                    },
                    {
                        name: res.data.beltName,
                        displayName: "Belt"
                    },
                    {
                        name: res.data.braceletName,
                        displayName: "Bracelet"
                    },
                    {
                        name: res.data.gloves,
                        displayName: "Gloves"
                    },
                    {
                        name: res.data.soulName,
                        displayName: "Soul"
                    },
                    {
                        name: res.data.soulName2,
                        displayName: "Heart"
                    },
                    {
                        name: res.data.petAuraName,
                        displayName: "Pet Aura"
                    },
                    {
                        name: res.data.soulBadgeName,
                        displayName: "Soul Bagde"
                    },
                    {
                        name: res.data.mysticBadgeName,
                        displayName: "Mystic Badge"
                    },
                    {
                        name: res.data.outfitName,
                        displayName: "Costume"
                    },
                    {
                        name: res.data.clothesAccessoryName,
                        displayName: "Adorment"
                    },
                    {
                        name: res.data.hairName,
                        displayName: "Head Adorment"
                    },
                    {
                        name: res.data.faceDecorationName,
                        displayName: "Face Adorment"

                    }
                ]
            }
            return char;
        })
        let getEQ = axios.get('https://api.silveress.ie/bns/v3/equipment/new'
        ).then(res => {
            const items = res.data;
            return items;
        })
        Promise.all([getCharacter, getEQ]).then((value) => {
            let char: any, eq: any;
            [char, eq] = value;

            const charEq = {
                ...char,
                equipment: char.equipment.map((c: Equipments) => {
                    return ({
                        displayName: c.displayName,
                        name: c.name,
                        rank: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.rank })[0],
                        type: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.type })[0],
                        img: eq.filter((e: Equipments) => { return e.name == c.name }).map((e: Equipments) => { return e.img })[0]
                    })
                })
            }
            if (search) {
                this.searchChar = charEq
                this.searchLoading = false
            }
            else {
                this.char = charEq;
                this.isLoadingData = false;
            }
            if (this.char.shortClass) {
                db.collection("users").doc(this.uid).update({
                    class: this.char.shortClass
                })
            }



        })
    }
}

export default createContext(new GlobalContext())