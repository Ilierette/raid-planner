import * as React from 'react';
import { MarketTableRow } from './marketTableRow'

interface MarketProps {
  title: string,
  items: [],
  trade: boolean,
  mats: [],
  handleInputChange: any,
  tierList: any
}

export class MarketTable extends React.Component<MarketProps> {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-sm text-center">
          <thead>
            <tr>
              <th colSpan={6}>
                {this.props.title}
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              {!this.props.trade && <th style={{ width: "30px" }}>Tier</th>}
              <th className="text-right">Name</th>
              <th style={{ width: "100px" }}>All</th>
              <th style={{ width: "100px" }}>Owned</th>
              <th style={{ width: "100px" }}>Rest</th>
              {this.props.trade && <th style={{ width: "100px" }}>Market price</th>}
              {this.props.trade && <th style={{ width: "250px" }} className="text-left">Total Price</th>}
            </tr>
          </thead>
          {this.props.tierList.map((tier: any) => (
            <tbody key={tier.name}>
              {tier.show && this.props.items.filter((item: any) => { return item.tier == tier.name }).map((item: any, index: any) => (
                <MarketTableRow
                  item={item}
                  key={index}
                  index={index}
                  trade={this.props.trade}
                  mats={this.props.mats}
                  handleInputChange={this.props.handleInputChange}
                />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}
