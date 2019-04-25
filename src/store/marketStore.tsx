import { observable } from 'mobx';
import { Mats, Tiers, UserMats, Gears, User } from '../models/interfaces';
import { marketData } from '../data/market';
import axios from 'axios';
import { mats, gear } from '../data/users';

interface MarketStoreState {
    tradeable: Mats[],
    untradeable: Mats[],
    tierList: Tiers[],
    totalCost: number,
}

class MarketStore implements MarketStoreState {
    @observable tradeable = marketData.basic;
    @observable untradeable = marketData.untradeable;
    @observable tierList = [
        { name: "other", show: true },
        { name: "BT", show: true },
        { name: "VT", show: true },
        { name: "TT", show: true },
        { name: "ET", show: true },
        { name: "PVP", show: true },
        { name: "common", show: true }
    ]

    @observable totalCost = 0;
    @observable isMarketEditMode = false;

    @observable mats = mats;
    @observable gear = gear;

    handleInputChange = (e: any, id: any) => {
        let matList = this.mats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    ...mat,
                    amount: e.target.value
                })
            }
            else return mat
        })

        this.mats = matList
        
        this.calculateTotalPrice();
        this.calculateTotalCost();
    }

    handleTierChange = (e: any) => {
        let allTiers = this.tierList.map((tier: Tiers) => {
            if (tier.name == e.target.value) {
                return ({
                    ...tier,
                    show: !tier.show
                })
            }
            else return tier
        })
        this.tierList = allTiers
    }

    getStoreData() {
        let allItems = axios.get('https://api.silveress.ie/bns/v3/market/eu/current/all').then(res => {
            let items = res.data.map((item: any) => {
                return ({
                    name: item.name,
                    price: item.listings.map((list: any) => { return list.price })[0]
                })
            })
            let tradeable = market.tradeable.map((trade: Mats) => {
                let current = (items.filter((item: any) => { return item.name == trade.name }).map((item: any) => { return item.price })[0]) / 1000
                return ({
                    ...trade,
                    price: current ? current : trade.price
                })
            })
            return tradeable
        })
        Promise.all([allItems]).then((value: any) => {
            market.tradeable = value[0];
            this.calculateTotalPrice();
            this.calculateTotalCost();
        })
    }

    calculateTotalPrice() {
        let mats = this.mats.map((mat: UserMats) => {
            return ({
                ...mat,
                totalAmount: this.gear.reduce((total: any, gear: Gears) => {
                    return total + gear.stages.reduce((acc: any, stage: any) => {
                        if (stage[mat.id])
                            return acc + stage[mat.id]
                        else return acc
                    }, 0)
                }, 0)
            })
        })
        let matsCost = mats.map((mat: UserMats) => {
            return ({
                ...mat,
                totalPrice: market.tradeable.reduce((total: any, trade: Mats) => {
                    if (mat.id == trade.id && trade.price) {
                        let current = (trade.price * (mat.totalAmount - mat.amount))
                        return total + (current > 0 ? current : 0)
                    }
                    return total

                }, 0)
            })
        })
        this.mats = matsCost;
    }

    calculateTotalCost() {
        let totalCost = this.mats.reduce((total: any, mat: UserMats) => {
            return total + mat.totalPrice
        }, 0)
        this.totalCost = totalCost
    }
}


export const market = new MarketStore();