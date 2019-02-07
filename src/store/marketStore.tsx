import { observable } from 'mobx';
import { Mats, Tiers } from '../models/interfaces';
import { marketData } from '../data/market';
import { user } from './userStore';

interface MarketStoreState {
    tradeable: Mats[],
    untradeable: Mats[],
    tierList: Tiers[],
    totalCost: number
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
        let matList = user.mats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    ...mat,
                    amount: e.target.value,
                    totalPrice: market.tradeable.filter((trade:any)=>{
                        return mat.id == trade.id
                    }).map((trade:any)=>{
                        return trade.price * e.target.value
                    })
                })
            }
            else return mat
        })

        user.mats = matList
        this.calculateTotalCost()
    }

    calculateTotalCost() {
        let cost = user.mats.filter((mat: any) => {
            return mat.amount > 0
        }).reduce((acc: any, mat: any) => {
            console.log(mat.totalPrice)
            return acc + mat.totalPrice
        }, 0)

        this.totalCost =  cost
    }

    handleTierChange = (e: any) => {
        let allTiers = this.tierList.map((tier: any) => {
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

}


export const market = new MarketStore();