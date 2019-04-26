import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { MarketRow } from './marketRow'
import { Mats, Tiers } from '../../models/interfaces';
import GearStore from '../../store/gearStore'

interface props {
  title: string,
  items: Mats[],
  trade: boolean,
}

export const MarketTable = observer(({ title, items, trade }: props) => {
  const { tierList, totalCost } = React.useContext(GearStore);
  return (
    <div className="table-responsive">
      <table className="table table-sm text-center">
        <thead>
          <tr>
            <th colSpan={6}>
              {title}
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            {!trade && <th style={{ width: "30px" }}>Tier</th>}
            <th className="text-right">Name</th>
            <th style={{ width: "100px" }}>All</th>
            <th style={{ width: "100px" }}>Owned</th>
            <th style={{ width: "100px" }}>Rest</th>
            {trade && <th style={{ width: "100px" }}>Market price</th>}
            {trade && <th style={{ width: "250px" }} className="text-left">Total Price</th>}
          </tr>
        </thead>
        {tierList.map((tier: Tiers) => (
          <tbody key={tier.name}>
            {tier.show && items.filter((item: Mats) => { return item.tier == tier.name }).map((item: Mats, index: number) => (
              <MarketRow
                item={item}
                key={index}
                index={index}
                trade={trade}
              />
            ))}
          </tbody>
        ))}
        {trade &&
          <tbody>
            <tr>
              <td colSpan={5} className="text-right">
                Total cost
                </td>
              <td className="text-left">
                {totalCost ? totalCost.toLocaleString() : 0}
              </td>
            </tr>
          </tbody>
        }
      </table>
    </div>
  )
})
