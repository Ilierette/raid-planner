import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable/marketTable';
import { observer } from 'mobx-react';
import { market } from '../store/marketStore';
import { Tiers } from '../models/interfaces';
import { user } from '../store/userStore';

@observer
export default class Marketplace extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <PageHeader title="Marketplace" />
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-10">
                                    <form>
                                        {market.tierList.map((tier: Tiers) => (
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
                                <div className="col-2 text-right">
                                    {market.isMarketEditMode ?
                                        <button className="btn btn-success btn-sm" onClick={() => market.isMarketEditMode = false}>Save changes</button> :
                                        <button className="btn btn-primary btn-sm" onClick={() => market.isMarketEditMode = true}>Edit</button>
                                    }
                                </div>
                            </div>
                            <div className="row mb-2">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
