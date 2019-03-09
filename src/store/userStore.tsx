import { observable } from 'mobx';
import { users, mats, gear } from '../data/users';
import { User } from '../models/interfaces';

interface UserStoreState {
    id: number,
    isBadge: boolean,
    isLoadingData: boolean,
    reload: boolean,
    users: User[],
    isGearEditMode: boolean,
    isMarketEditMode: boolean
    isAuthUser: boolean
}

class UserStore implements UserStoreState {
    @observable id = 0;
    @observable users = users;
    @observable name = this.users[this.id].name;
    @observable dpsCount = this.users[this.id].dpsCount;
    @observable dpsImg = this.users[this.id].dpsImg;
    @observable region = this.users[this.id].region;
    @observable isMain = this.users[this.id].isMain;
    @observable isBadge = true;
    @observable reload = true;
    @observable isLoadingData = true;
    @observable isGearEditMode = false;
    @observable isMarketEditMode = false;
    @observable isAuthUser = true;
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

    toggle = (tab:number) => {
        this.tab = tab;
    }

    @observable mats = mats;
    @observable gear = gear;

    
}

export const user = new UserStore();
