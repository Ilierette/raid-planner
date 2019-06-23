import { observable } from 'mobx';
import { User } from '../models/interfaces';
import { createContext } from 'react';
import { db, auth } from './config';
import { initDays } from '../data/character';

class RaidStore {
    @observable raids: any = [];
    @observable isBadge: boolean = true;
    @observable users: any = [];
    @observable region: string = "eu";
    @observable isEditMode: boolean = false;
    @observable isAddMode: boolean = false;
    @observable selectedCharName: any = null;
    @observable suggestions: any = null;
    @observable selectedCharId: string;
    @observable selectedCharClass: string;
    @observable selectedCharIsMain: boolean;
    @observable selectedCharIsStatic: boolean;
    @observable selectedCharHours: any;
    @observable uid: any;

    getRaidData = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;
                db.collection("users").onSnapshot((snap) => {
                    let comp = this;
                    snap.forEach((doc) => {
                        comp.users.push(doc.data())
                    })
                })

                db.collection("users").doc(this.uid).collection("raids").onSnapshot((snap) => {
                    let raidIdList: any = [];
                    snap.forEach((doc) => {
                        raidIdList.push(doc.data())
                    })
                    this.raids = raidIdList
                })
            }
        })

    }

    getSuggestions = (e: any) => {
        const suggest = this.users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: User) => {
            return user
        });

        this.selectedCharName = e.target.value;
        this.suggestions = suggest.length == 0 ? null : suggest;
        this.selectedCharId = null;
        this.selectedCharClass = null;
        this.selectedCharIsMain = null;
        this.selectedCharIsStatic = null;
        this.selectedCharHours = null
    }

    selectChar = (e: any, item: User) => {
        e.preventDefault();
        this.selectedCharName = item.name;
        this.suggestions = null;
        this.selectedCharId = item.id;
        this.selectedCharClass = item.class;
        this.selectedCharIsMain = item.isMain;
        this.selectedCharIsStatic = true;
        this.selectedCharHours = initDays;
    }

    selectIfStatic = (e: any) => {
        if (e.target.value == "Static") {
            this.selectedCharIsStatic = true
        }
        else {
            this.selectedCharIsStatic = false
        }
    }
    addUser = (id: number) => {
        const selectedChar = {
            id: this.selectedCharId,
            name: this.selectedCharName,
            isFounder: false,
            isLeader: false,
            isStatic: this.selectedCharIsStatic,
            isConfirmed: false,
            isExpanded: false,
            notes: "",
            days: this.selectedCharHours

        }
        this.raids[id].members.push(selectedChar);
        this.raids[id].isAddMode = false;
        this.selectedCharName = null;
        this.suggestions = null;
        this.selectedCharId = null;
        this.selectedCharClass = null;
        this.selectedCharIsMain = null;
        this.selectedCharIsStatic = null;
        this.selectedCharHours = null;
        this.selectedCharHours = null;
    }

    
    // getMin(raidId: number, id:number){
    //     let min = store.raids[raidId].members.map((member: Member)=>{
    //         return member.days[id]
    //     })
    // }

}

export default createContext(new RaidStore())