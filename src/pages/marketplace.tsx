import * as React from 'react';
import market from '../data/market';

interface MarketplaceState {
    market: []
}

export default class Marketplace extends React.Component<MarketplaceState> {
    constructor(props: any) {
        super(props)

        this.state = { market: market }
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Marketplace</h1>
                
                <ul>
                {this.state.market.basic.map((item: any, index: any) => (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
                </ul>
                <ul>
                    {this.state.market.dragon.map((item: any, index: any) => (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
                </ul>
                <ul>
                    {this.state.market.raid.map((item: any, index: any) => (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
                </ul>
                <ul>
                    {this.state.market.untradeable.map((item: any, index: any) => (
                    <li key={index}>{item.name} - {item.tier}</li>
                ))}
                </ul>
            </div>
        );
    }
}
