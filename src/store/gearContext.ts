import { createContext } from "react";
import { observable } from "mobx";
import axios from 'axios';
import { db, auth } from "./firebase";

class gearContext {
    @observable mats: any = [];
    @observable gear: any = [];

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
    @observable isGodMode = false;
    @observable uid: any = null;
    @observable marketMats: any = [];

    @observable goodAmount = true;

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
        this.goodAmount = true;
        
    }

    handleSaveMats = (e:any) => {
        e.preventDefault()
        this.mats.map((mat:any)=>{
            db.collection("users").doc(this.uid).collection("mats").doc(mat.id).update({
                amount: mat.amount
            })
        })
        this.isMarketEditMode = false
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


    getData = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;

                db.collection("users").doc(this.uid).collection("mats").onSnapshot((snap) => {
                    let mats: any = [];
                    snap.forEach((doc) => {
                        mats.push(doc.data())
                    })
                    let amount = mats.map((mat: any) => {
                        return ({
                            ...mat,
                            totalAmount: mat.totalAmount ? mat.totalAmount : 0
                        })
                    })
                    this.mats = amount
                })

                // db.collection("users").doc(this.uid).onSnapshot((doc) => {
                //     this.mats = doc.data().mats.map((mat: any) => (
                //         {
                //             ...mat,
                //             totalAmount: mat.totalAmount ? mat.totalAmount : 0
                //         }
                //     ));
                //     this.calculateTotalPrice();
                //     this.calculateTotalCost();
                // })

                // db.collection("users").doc(this.uid).onSnapshot((doc) => {
                //     const userGears: any = []
                //     const userStages: any = [];

                //     doc.data().gears.map((gear: any) => {
                //         gear.stages.map((stage: any) => {
                //             userStages.push(stage)
                //         })

                //         db.collection("gears").doc(gear.id).onSnapshot((doc) => {
                //             const mainStage: any = [];

                //             userStages.map((userStage: any) => {
                //                 doc.data().stages.map((stage: any) => {
                //                     if (stage.name == userStage.name) {
                //                         mainStage.push(stage)
                //                     }
                //                 })
                //             })

                //             userGears.push({
                //                 ...doc.data(),
                //                 stages: mainStage
                //             })

                //             this.gear = userGears
                //         })
                //     })
                // })
            }
        })
        db.collection("mats").onSnapshot((querySnapshot) => {
            let items: any = [];

            querySnapshot.forEach(function (doc) {
                items.push(doc.data())
            });

            this.marketMats = items
            this.getStoreData()
        })
    }

    getStoreData = () => {
        let allItems = axios.get('https://api.silveress.ie/bns/v3/market/eu/current/all').then(res => {
            let items = res.data.map((item: any) => {
                return ({
                    name: item.name,
                    price: item.listings.map((list: any) => { return list.price })[0]
                })
            })
            let tradeable = this.marketMats.map((trade: any) => {
                let current = (items.filter((item: any) => { return item.name == trade.name }).map((item: any) => { return item.price })[0]) / 1000
                return ({
                    ...trade,
                    price: current ? current : trade.price
                })
            })
            return tradeable
        })
        Promise.all([allItems]).then((value: any) => {
            this.marketMats = value[0];
            this.calculateTotalPrice();
            this.calculateTotalCost();
        })
    }

    calculateTotalPrice = () => {
        let mats = this.mats.map((mat: any) => {
            return ({
                ...mat,
                totalAmount: this.gear.reduce((total: any, gear: any) => {
                    return total + gear.stages.reduce((acc: any, stage: any) => {
                        if (stage[mat.id])
                            return acc + stage[mat.id]
                        else return acc
                    }, 0)
                }, 0)
            })
        })
        let matsCost = mats.map((mat: any) => {
            return ({
                ...mat,
                totalPrice: this.marketMats.reduce((total: any, trade: any) => {
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

    calculateTotalCost = () => {
        let totalCost = this.mats.reduce((total: any, mat: any) => {
            return total + mat.totalPrice
        }, 0)
        this.totalCost = totalCost
    }

    toogleEditMode = () => {
        this.isMarketEditMode = !this.isMarketEditMode
        this.isGodMode = false;
        this.goodAmount = false;
    }
    toogleGodMode = () => {
        this.isGodMode = !this.isGodMode
        this.isMarketEditMode = false;
    }
}

export default createContext(new gearContext())