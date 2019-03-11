import { observable } from 'mobx';
import { users, mats, gear } from '../data/users';
import { auth, db } from './config';

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
    @observable needs:any = null;

    @observable isLoadingData = true;

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

                        console.log(this.needs)
                    }
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


    @observable users = users;
    @observable isBadge = true;
    @observable reload = true;
    @observable isGearEditMode = false;
    @observable isMarketEditMode = false;
    @observable tab = 1;

    changeName = (e: any) => {
        if (!(e.key == 'Shift' || e.key == 'Control' || e.key == 'Alt')) {
            this.reload = false;
            this.isBadge = false;
            this.name = e.target.value;
        }
        if (e.key == 'Enter') {
            this.reload = true;
            this.name = e.target.value;
        }
    }

    changeRegion = (e: any) => {
        this.region = e.target.value;
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.reload = true;
    }

    returnHome = () => {
        this.reload = false;
        this.name = "Letty";
        setTimeout(() => {
            this.reload = true;
            this.isBadge = true;
        }, 1);
    }

    toggle = (tab: number) => {
        this.tab = tab;
    }

    @observable mats = mats;
    @observable gear = gear;

}

export const user = new UserStore();
