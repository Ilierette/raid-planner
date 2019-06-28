import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { MarketRow } from './marketRow'
import { Mats, Tiers } from '../../models/interfaces';
import gearContext from '../../store/gearContext'

interface props {
  title: string,
  items: any,
  trade: boolean,
}

export const MarketTable = observer(({ title, items, trade }: props) => {
  const { tierList, totalCost, isGodMode } = React.useContext(gearContext);
  return (
    <div className="table-responsive">
      <table className="table table-sm text-center">
        <thead>
          <tr>
            <th colSpan={isGodMode ? 3 : 6}>
              {title}
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            {isGodMode && <th style={{ width: "250px" }}>Id</th>}
            {!trade && !isGodMode &&
              <th style={{ width: "30px" }}>Tier</th>
            }
            <th className={isGodMode ? "" : "text-right"}>Name</th>
            {!isGodMode && <th style={{ width: "100px" }}>All</th>}
            {!isGodMode && <th style={{ width: "100px" }}>Owned</th>}
            {!isGodMode && <th style={{ width: "100px" }}>Rest</th>}
            {trade && <th style={{ width: "100px" }}>Market price</th>}
            {trade && <th style={{ width: "250px" }} className="text-left">Total Price</th>}
            {isGodMode && <th style={{ width: "250px" }} className="text-left">Delete</th>}
          </tr>
        </thead>

        {tierList.map((tier: Tiers) => (
          <tbody key={tier.name}>
            {tier.show && items.filter((item: Mats) => {
              return item.tier == tier.name
            }).filter((item: any) => {
              if (!isGodMode)
                return !item.isOutdated
              else
                return item
            }).map((item: Mats, index: number) => (
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
