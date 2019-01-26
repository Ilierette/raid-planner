import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable';
import { market } from '../data/market';
import { users } from '../data/users';
import axios from 'axios';

import { observable } from "mobx";
import { observer } from 'mobx-react';

interface MarketplaceState {
    tradeable: Mat[],
    untradeable: Mat[],
    userMats: UserMat[],
    tierList: Tier[]
}

interface Mat {
    id: string,
    tier: string,
    name: string,
    price: number
}

interface UserMat {
    id: string,
    amount: number
}

interface Tier {
    name: string,
    show: boolean
}

@observer
export default class Marketplace extends React.Component<MarketplaceState> {

    @observable tradeable = market.basic;
    @observable untradeable = market.untradeable;
    @observable userMats = users[0].mats;
    @observable tierList = [
        { name: "other", show: true },
        { name: "BT", show: true },
        { name: "VT", show: true },
        { name: "TT", show: true },
        { name: "ET", show: true },
        { name: "PVP", show: true },
        { name: "common", show: true }
    ]

    componentDidMount() {
        let allItems = axios.get('https://api.silveress.ie/bns/v3/market/eu/current/all').then(res => {
            let items = res.data.map((item: any) => {
                return ({
                    name: item.name,
                    price: item.listings.map((list: any) => { return list.price })[0]
                })
            })

            let tradeable = this.tradeable.map((trade: any) => {
                let current = (items.filter((item: any) => { return item.name == trade.name }).map((item: any) => { return item.price })[0]) / 1000
                return ({
                    ...trade,
                    price: current ? current : trade.price
                })
            })

            return tradeable
        })
        Promise.all([allItems]).then((value: any) => {
            let all = [...this.tradeable, ...this.untradeable].map((a: any) => {
                return ({
                    ...a,
                    id: a.id,
                    amount: this.userMats.filter((mat: any) => { return a.id == mat.id }).map((e: any) => {
                        return e.amount
                    })[0]
                })
            })
            this.userMats = all;
            this.tradeable = value[0];
        })
    }

    handleInputChange = (e: any, id: any) => {
        
        let matList = this.userMats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    id: id,
                    amount: e.target.value
                })
            }
            else return mat
        })

        this.userMats = matList
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
    render() {
        return (
            <div className="content-wrapper">
                <PageHeader title="Marketplace" />
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-12 mb-2">
                                    <form>
                                        {this.tierList.map((tier: any) => (
                                            <div className="form-check form-check-inline" key={tier.name}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={tier.name}
                                                    onClick={(e) => this.handleTierChange(e)}
                                                    defaultChecked={tier.show}
                                                />
                                                <label className="form-check-label" htmlFor={tier.name}>{tier.name}</label>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                                <div className="col-5">
                                    <MarketTable
                                        title="Untradeable"
                                        items={this.untradeable}
                                        trade={false}
                                        mats={this.userMats}
                                        handleInputChange={this.handleInputChange}
                                        tierList={this.tierList}
                                    />
                                </div>
                                <div className="col-7 d-flex flex-column">
                                    <MarketTable
                                        title="Tradeable"
                                        items={this.tradeable}
                                        trade={true}
                                        mats={this.userMats}
                                        handleInputChange={this.handleInputChange}
                                        tierList={this.tierList}
                                    />
                                    <div className="mt-auto text-right">
                                        <button className="btn btn-success">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
