import { observable, toJS } from 'mobx';
import { Raid, User, Member } from '../models/interfaces';
import { createContext } from 'react';
import { db, auth } from './config';
import { initDays } from '../data/character';

class RaidStore {
    @observable raids:any = [];
    @observable isBadge: boolean = true;
    @observable users:any = [];
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
    @observable uid:any;

    getRaidData = () => {
        auth.onAuthStateChanged((user) => {
            this.uid = user.uid;
        })
        let user:any = []
        db.collection("users").onSnapshot((snap)=>{
            snap.forEach((doc)=>{
                user.push(doc.data())
            })
            this.users = user;
        })
    }

    toogle = (raidId: number, id: string) => {
        let raidList = this.raids[raidId].members.map((item: Member) => {
            if (item.id == id) {
                return ({
                    ...item,
                    isExpanded: !item.isExpanded
                })
            }
            else {
                return ({
                    ...item,
                    isExpanded: false
                })
            }
        })
        this.raids[raidId].members = raidList
    }

    addUserRow = (id: number) => {
        this.raids[id].isEditMode = false;
        this.raids[id].isAddMode = !this.raids[id].isAddMode;
    }

    editHours = (id: number) => {
        this.raids[id].isEditMode = !this.raids[id].isEditMode;
        this.raids[id].isAddMode = false;
    }

    removeUser = (id: number, userId: string) => {
        const index = this.raids[id].members.findIndex((m:any) => m.id == userId);
        const all = this.raids[id].members

        if (index > -1) {
            all.splice(index, 1);
        }
        this.raids[id].members = all
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

    editHoursMin = (raidId: number, id: number, date: string, e: any) => {
        this.raids[raidId].members.map((member: Member) => {
            if (member.id == this.uid) {
                return ({
                    date: date,
                    min: member.days[id].min = e.target.value,
                })
            }
        })

        //this.getMin(raidId, id);
    }
    editHoursMax = (raidId: number, id: number, date: string, e: any) => {
        this.raids[raidId].members.map((member: Member) => {
            if (member.id == this.uid) {
                return ({
                    date: date,
                    max: member.days[id].max = e.target.value
                })
            }
        })
    }
    // getMin(raidId: number, id:number){
    //     let min = store.raids[raidId].members.map((member: Member)=>{
    //         return member.days[id]
    //     })
    // }

}

export default createContext(new RaidStore())