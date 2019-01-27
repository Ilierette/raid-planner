import { observable } from 'mobx';
import { raid } from '../data/raid';
import { users } from '../data/users';

interface RaidState {
    raids: Raid[],
    currentMemberId: string
}
interface Raid {
    isBadge: boolean,
    users: User[],
    members: Member[],
    region: string,
    isEditMode: boolean,
    isAddMode: boolean
    isLeader: boolean;
    suggestions: any,
    selectedCharName: string,
    selectedCharId: string,
    selectedCharClass: string,
    selectedCharIsMain: boolean,
    selectedCharIsStatic: boolean,
    selectedCharHours: any
}

interface Member {
    id: string,
    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
    notes: string
}
interface User {
    id: string,
    name: string,
    class: string,
    region: string,
    isMain: boolean,
    days: Day[],
    mats: Mat[]
}
interface Day {
    date: string,
    min: string,
    max: string
}
interface Mat {
    id: string,
    amount: number
}

class RaidStore implements RaidState {
    @observable raids = raid;
    @observable currentMemberId = "letty";
    @observable isBadge = true;
    @observable users = users;
    @observable region = "eu";
    @observable isEditMode = false;
    @observable isAddMode = false;

    @observable selectedCharName: any = null;
    @observable suggestions: any = null;
    @observable selectedCharId: string;
    @observable selectedCharClass: string;
    @observable selectedCharIsMain: boolean;
    @observable selectedCharIsStatic: boolean;
    @observable selectedCharHours: any;


    toogle = (raidId: any, id: any) => {
        let raidList = this.raids[raidId].members.map((item: any) => {
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

    addUserRow = (id: any) => {
        this.raids[id].isEditMode = false;
        this.raids[id].isAddMode = !this.raids[id].isAddMode;
    }

    editHours = (id: any) => {
        this.raids[id].isEditMode = !this.raids[id].isEditMode;
        this.raids[id].isAddMode = false;
    }

    removeUser = (id:any, userId:any) => {
        const all = this.raids[id].members
        if(userId > -1){
            all.splice(userId,1);
        }
        this.raids[id].members = all
    }

    getSuggestions = (e: any) => {
        const suggest = this.users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: any) => {
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

    selectChar = (e: any, item: any) => {
        e.preventDefault();
        this.selectedCharName = item.name;
        this.suggestions = null;
        this.selectedCharId = item.id;
        this.selectedCharClass = item.class;
        this.selectedCharIsMain = item.isMain;
        this.selectedCharIsStatic = true;
        this.selectedCharHours = item.days;
    }

    selectIfStatic = (e: any) => {
        if (e.target.value == "Static") {
            this.selectedCharIsStatic = true
        }
        else {
            this.selectedCharIsStatic = false
        }
    }
    addUser = (id:any) => {
        const selectedChar = {
            id: this.selectedCharId,
            name: this.selectedCharName,
            isFounder: false,
            isLeader: false,
            isStatic: this.selectedCharIsStatic,
            isConfirmed: false,
            isExpanded: false,
            notes: ""

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
    }

}

export const store = new RaidStore();