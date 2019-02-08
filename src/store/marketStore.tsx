import { observable } from 'mobx';
import { Mats, Tiers, UserMats, Gears, User } from '../models/interfaces';
import { marketData } from '../data/market';
import { user } from './userStore';
import axios from 'axios';

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

    handleInputChange = (e: any, id: any) => {
        /* let matList = user.mats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    ...mat,
                    amount: e.target.value,
                    totalPrice: market.tradeable.filter((trade: any) => {
                        return mat.id == trade.id
                    }).map((trade: any) => {
                        return trade.price * e.target.value
                    })
                })
            }
            else return mat
        })

        user.mats = matList
        this.calculateTotalCost() */
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
            let mats = user.mats.map((mat: UserMats) => {
                return ({
                    ...mat,
                    totalAmount: user.gear.reduce((total: any, gear: Gears) => {
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
            user.mats = matsCost;
            this.calculateTotalCost()
        })
    }

    calculateTotalCost() {
        let totalCost = user.mats.reduce((total:any, mat:UserMats)=>{
            return total + mat.totalPrice
        },0)
        this.totalCost = totalCost
    }
}


export const market = new MarketStore();