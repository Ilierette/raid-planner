import { observable } from 'mobx';
import { createContext } from 'react';
import { db, auth } from './firebase';

class RaidStore {
    @observable raids: any = [];
    @observable users: any = [];
    @observable uid: any;
    @observable isLoading = true;
    @observable isLoadingUsers = true;

    getRaidData = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;
                db.collection("users").onSnapshot((snap) => {
                    let users:any =[];
                    snap.forEach((doc) => {
                        this.isLoadingUsers = true
                        users.push(doc.data())
                    })
                    this.users = users
                    this.isLoadingUsers = false
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

    @observable isBadge: boolean = true;
}

export default createContext(new RaidStore())