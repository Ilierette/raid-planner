import { observable } from 'mobx';
import { raid } from '../data/raid';
import { users } from '../data/users';

interface RaidStoreState {
    raids: Raid[],
    currentMemberId: string,
    users: User[],
    activeTab: string,
}
interface Raid {
    type: string,
    ratio: string,
    timestamp: string,
    maxMembers: number,
    members: Member[],
    isMain: boolean,
    isBadge: boolean,
    region: string,
    isEditMode: boolean,
    isAddMode: boolean,
    suggestions: any,
    isSuggestions: boolean,
    selectedCharId: string,
    selectedCharName: string,
    selectedCharClass: string,
    selectedCharIsMain: boolean,
    selectedCharIsStatic: boolean,
    selectedCharHours: any,

    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
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

class RaidStore implements RaidStoreState {
    @observable currentMemberId = "letty";
    @observable isLeader = false;
    @observable isFounder = false;
    @observable isStatic = false;
    @observable isConfirmed = false;
    @observable isExpanded = false;


    @observable raids: any = raid;
    @observable users: any = users;
    @observable region = "eu";
    @observable isMain = true;
    @observable isBadge = true;
    @observable activeTab = '1';
    @observable isRaidLeader = false;
    @observable isEditMode = false;
    @observable isAddMode = false;
    @observable suggestions: any = null;
    @observable selectedCharId: any = null;
    @observable selectedCharName = "";
    @observable selectedCharClass = "";
    @observable selectedCharIsMain: any = null;
    @observable selectedCharIsStatic: any = null;
    @observable selectedCharHours: any = null;

    getcurrentMemberFlags = () => {
        this.raids.map((raid: any) => (
            raid.members.filter((member: any) => {
                raid.isLeader = member.isLeader;
                raid.isFounder = member.isFounder;
                raid.isStatic = member.isStatic;
                raid.isConfirmed = member.isConfirmed;
                raid.isExpanded = member.isExpanded;
            })
        ))
    }

    changeTab = (tab: any) => {
        if (this.activeTab !== tab) {
            this.activeTab = tab
        }
    }
    toogle = (id: any) => {
        let raidList = this.raids.map((raid: any) => {
            return ({
                ...raid,
                members: raid.members.map((item: any) => {
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
            })
        })

        this.raids = raidList
    }
    addUserRow = () => {
        this.isAddMode = !this.isAddMode;
        this.isEditMode = false
    }
    editHours = () => {
        this.isAddMode = false;
        this.isEditMode = !this.isEditMode
    }

    getSuggestions = (e: any) => {
        const suggest = this.users.filter((user: any) => (
            e.target.value.length > 0 && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        ).map((user: any) => {
            return user
        });
        this.suggestions = suggest.length == 0 ? null : suggest;
        this.selectedCharName = e.target.value;
        this.selectedCharId = null;
        this.selectedCharClass = null;
        this.selectedCharIsMain = null;
        this.selectedCharIsStatic = null;
        this.selectedCharHours = null;
    }

    selectChar = (e: any, item: any) => {
        e.preventDefault();
        this.selectedCharId = item.id;
        this.selectedCharName = item.name;
        this.selectedCharClass = item.class;
        this.selectedCharIsMain = item.isMain;
        this.suggestions = null;
        this.selectedCharIsStatic = true;
        this.selectedCharHours = item.day;
    }
    selectIfStatic = (e: any) => {
        if (e.target.value == "Static") {
            this.selectedCharIsStatic = true
        }
        else {
            this.selectedCharIsStatic = false
        }
    }
    addUser = () => {
        const selectedChar = {
            id: this.selectedCharId,
            name: this.selectedCharName,
            class: this.selectedCharClass,
            isMain: this.selectedCharIsMain,
            days: this.selectedCharHours
        }
        this.raids[0].members += selectedChar;
    }
    removeUser = () => {
        console.log("Remove user");
    }
}

export const store = new RaidStore();