import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable';

import market from '../data/market';
import members from '../data/users';

interface MarketplaceState {
    tradeable: [],
    untradeable: [],
    userMats: []
}

export default class Marketplace extends React.Component<MarketplaceState> {
    constructor(props: any) {
        super(props)

        this.state = {
            tradeable: market.basic,
            untradeable: market.untradeable,
            userMats: members.users[0].mats
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <PageHeader title="Marketplace" />
                <div className="content">
                    <div className="row">
                        <div className="col">
                            <MarketTable 
                                title="Tradeable" 
                                items={this.state.tradeable} 
                                trade={true} 
                                mats={this.state.userMats}/>
                        </div>
                        <div className="col">
                            <MarketTable 
                                title="Untradeable" 
                                items={this.state.untradeable} 
                                trade={false} 
                                mats={this.state.userMats}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
