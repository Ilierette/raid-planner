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

    @observable suggestions: any = null;

    @observable selectedCharName: any = null;
    @observable selectedCharId: string;
    @observable selectedCharClass: string;
    @observable selectedCharIsMain: boolean;
    @observable selectedCharIsStatic: boolean;
    @observable selectedCharHours: any;

    @observable uid: any;
    @observable isLoading = true;

    getRaidData = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;
                db.collection("users").get().then((snap) => {
                    let comp = this;
                    snap.forEach((doc) => {
                        comp.users.push(doc.data())
                    })
                })

                db.collection("users").doc(this.uid).collection("raids").onSnapshot((snap) => {

                    let raidIdList: any = [];
                    snap.forEach((doc) => {
                        this.isLoading = true;
                        raidIdList.push(doc.data())
                    })
                    this.raids = raidIdList
                    this.isLoading = false
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
}

export default createContext(new RaidStore())