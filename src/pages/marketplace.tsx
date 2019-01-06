import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable';
import market from '../data/market';
import members from '../data/users';
import axios from 'axios';

interface MarketplaceState {
    tradeable: any,
    untradeable: any,
    userMats: any,
    tierList: any
}

export default class Marketplace extends React.Component<MarketplaceState> {
    constructor(props: any) {
        super(props)

        this.state = {
            tradeable: market.basic,
            untradeable: market.untradeable,
            userMats: members.users[0].mats,
            tierList: [
                { name: "other", show: true },
                { name: "BT", show: true },
                { name: "VT", show: true },
                { name: "TT", show: true },
                { name: "ET", show: true },
                { name: "PVP", show: true },
                { name: "common", show: true }
            ]
        }
    }
    componentDidMount() {
        let allItems = axios.get('https://api.silveress.ie/bns/v3/market/eu/current/all').then(res => {
            let items = res.data.map((item: any) => {
                return ({
                    name: item.name,
                    price: item.listings.map((list: any) => { return list.price })[0]
                })
            })

            let tradeable = this.state.tradeable.map((trade: any) => {
                let current = (items.filter((item: any) => { return item.name == trade.name }).map((item: any) => { return item.price })[0])/1000
                return ({
                    ...trade,
                    price: current ? current : trade.price
                })
            })

            return tradeable
        })
        Promise.all([allItems]).then((value: any) => {
            let all = [...this.state.tradeable, ...this.state.untradeable].map((a: any) => {
                return ({
                    ...a,
                    id: a.id,
                    amount: this.state.userMats.filter((mat: any) => { return a.id == mat.id }).map((e: any) => {
                        return e.amount
                    })[0]
                })
            })
            this.setState({
                userMats: all,
                tradeable: value[0]
            })
        })
    }

    handleInputChange = (e: any, id: any) => {
        let matList = this.state.userMats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    id: id,
                    amount: e.target.value
                })
            }
            else return mat
        })

        this.setState({
            userMats: matList
        })
    }
    handleTierChange = (e: any) => {
        let allTiers = this.state.tierList.map((tier: any) => {
            if (tier.name == e.target.value) {
                return ({
                    ...tier,
                    show: !tier.show
                })
            }
            else return tier
        })

        this.setState({
            tierList: allTiers
        })
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
                                        {this.state.tierList.map((tier: any) => (
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
                                        items={this.state.untradeable}
                                        trade={false}
                                        mats={this.state.userMats}
                                        handleInputChange={this.handleInputChange}
                                        tierList={this.state.tierList}
                                    />
                                </div>
                                <div className="col-7 d-flex flex-column">
                                    <MarketTable
                                        title="Tradeable"
                                        items={this.state.tradeable}
                                        trade={true}
                                        mats={this.state.userMats}
                                        handleInputChange={this.handleInputChange}
                                        tierList={this.state.tierList}
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
