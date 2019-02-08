import { observable } from 'mobx';
import { users, mats, gear } from '../data/users';
import { User } from '../models/interfaces';
import { market } from './marketStore';

interface UserStoreState {
    id: number,
    isBadge: boolean,
    isLoadingData: boolean,
    reload: boolean,
    users: User[]
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

    @observable mats = mats;
    @observable gear = gear;

    countTotal() {
        let mats = this.mats.map((mat: any) => {
            return ({
                ...mat,
                totalAmount: user.gear.reduce((total: any, gear: any) => {
                    return total + gear.stages.reduce((acc: any, stage: any) => {
                        if (stage[mat.id])
                            return acc + stage[mat.id]
                        else return acc
                    }, 0)
                }, 0)
            })
        })
        this.mats = mats
    }
}

export const user = new UserStore();
