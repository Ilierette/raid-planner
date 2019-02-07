import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable';
import axios from 'axios';
import { observer } from 'mobx-react';
import { user } from '../store/userStore';
import { market } from '../store/marketStore';

@observer
export default class Marketplace extends React.Component {
    componentDidMount() {
        let allItems = axios.get('https://api.silveress.ie/bns/v3/market/eu/current/all').then(res => {
            let items = res.data.map((item: any) => {
                return ({
                    name: item.name,
                    price: item.listings.map((list: any) => { return list.price })[0]
                })
            })

            let tradeable = market.tradeable.map((trade: any) => {
                let current = (items.filter((item: any) => { return item.name == trade.name }).map((item: any) => { return item.price })[0]) / 1000
                return ({
                    ...trade,
                    price: current ? current : trade.price
                })
            })

            return tradeable
        })
        Promise.all([allItems]).then((value: any) => {
            let all = [...market.tradeable, ...market.untradeable].map((a: any) => {
                return ({
                    ...a,
                    id: a.id,
                    amount: user.mats.filter((mat: any) => { return a.id == mat.id }).map((e: any) => {
                        return e.amount
                    })[0]
                })
            })
            user.mats = all;
            market.tradeable = value[0];
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
                                        {market.tierList.map((tier: any) => (
                                            <div className="form-check form-check-inline" key={tier.name}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={tier.name}
                                                    onClick={(e) => market.handleTierChange(e)}
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
                                        items={market.untradeable}
                                        trade={false}
                                    />
                                </div>
                                <div className="col-7 d-flex flex-column">
                                    <MarketTable
                                        title="Tradeable"
                                        items={market.tradeable}
                                        trade={true}
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
