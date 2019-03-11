import { observable } from 'mobx';
import { users, mats, gear } from '../data/users';
import { auth, db } from './config';
import { character } from '../data/character';
import axios from 'axios';
import { Equipments } from '../models/interfaces';

class UserStore {
    @observable isAuthUser = false;
    @observable user: any = null
    @observable isLoading = true;
    @observable uid: any = null;
    @observable name: any = null;
    @observable region: any = null;
    @observable dpsCount: any = null;
    @observable dpsImg: any = null;
    @observable isMain: any = null;
    @observable needs: any = null;

    @observable isLoadingData = true;
    @observable char = character;

    authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.isAuthUser = true;
                this.user = user;
                this.uid = user.uid;

                const docRef = db.collection("users").doc(this.uid);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        this.name = doc.data().username;
                        this.region = doc.data().region;
                        this.dpsCount = doc.data().dpsParseValue;
                        this.dpsImg = doc.data().dpsParse;
                        this.isMain = doc.data().isMain;
                        this.needs = doc.data().needs;
                    }
                }).then(() => {
                    this.callApi(this.name, this.region);
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

    callApi = (name: string, region: string) => {
        this.isLoadingData = true;
        let getCharacter = axios.get('https://api.silveress.ie/bns/v3/character/full/' + region + '/' + name).then(res => {
            let activeElement = res.data.activeElement;
            if (activeElement == "Ice") {
                activeElement = "Frost";
            }
            const char = {
                ap: res.data.ap,
                hp: res.data.hp,
                name: res.data.accountName,
                displayName: res.data.characterName,
                class: res.data.playerClass,
                lvl: res.data.playerLevel,
                lvlHM: res.data.playerLevelHM,
                faction: res.data.faction,
                factionRank: res.data.factionRank,
                server: res.data.server,
                guild: res.data.guild,
                img: res.data.characterImg,
                activeElement: activeElement,
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
        let getEQ = axios.get('https://api.silveress.ie/bns/v3/equipment/new').then(res => {
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
            this.isLoadingData = false
            this.char = charEq;
        })
    }

    @observable users = users;
    @observable mats = mats;
    @observable gear = gear;

}

export const user = new UserStore();
