export interface Raid {
    type: string,
    ratio: string,
    timestamp: string;
    maxMembers: number;
    members: Member[],
    
    isEditMode: boolean,
    isAddMode: boolean
    isLeader: boolean;
}

export interface Raid {
    type: string,
    ratio: string,
    timestamp: string;
    maxMembers: number;
    members: Member[],
    
    isEditMode: boolean,
    isAddMode: boolean
    isLeader: boolean;
}

export interface Member {
    id: string,
    isFounder: boolean,
    isLeader: boolean,
    isStatic: boolean,
    isConfirmed: boolean,
    isExpanded: boolean,
    notes: string,
    days: Day[]
}
export interface User {
    id: string,
    name: string,
    class: string,
    region: string,
    isMain: boolean,
    mats: UserMats[]
}
export interface Day {
    date: string,
    min: string,
    max: string
}
export interface Mats {
    id: string,
    tier: string,
    name: string,
    price?: number
}

export interface UserMats {
    id: string,
    amount: number,
    totalPrice?: any
}

export interface Tiers {
    name: string,
    show: boolean
}