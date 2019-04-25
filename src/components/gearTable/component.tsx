import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Gears, Mats, UserMats, Stages } from '../../models/interfaces';
import { user } from '../../store/userStore';
import { market } from '../../store/marketStore';

export const GearTable = observer(() => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <h5 className="card-title"></h5>
          <table className="table table-sm text-center">
            <thead>
              <tr>
                <th rowSpan={2} className="text-right" style={{ width: 220 }}>
                  Mats
                  </th>
                {user.gear.map((item: Gears) => (
                  <th colSpan={item.stages.length}>
                    {item.name}
                  </th>
                ))}
                <th rowSpan={2} style={{ width: 90 }} >All</th>
                <th rowSpan={2} style={{ width: 90 }} >Owned</th>
                <th rowSpan={2} style={{ width: 90 }} >Left</th>
              </tr>
              <tr>
                {user.gear.map((item: Gears) => (
                  item.stages.map((stage: Stages) => (
                    <th>{stage.name}</th>
                  ))
                ))}
              </tr>
            </thead>
            <tbody>
              {
                market.tradeable.map((trade: Mats) => (
                  user.mats.map((mat: UserMats) => {
                    if (mat.id == trade.id && mat.totalAmount != 0) {
                      return (
                        <tr>
                          <td className="text-right">
                            {trade.name}
                          </td>
                          {user.gear.map((item: Gears) => (
                            item.stages.map((stage: any) => (
                              <td>{stage[trade.id]}</td>
                            ))
                          ))}
                          <td>
                            {mat.totalAmount}
                          </td>
                          <td>
                            {mat.amount}
                          </td>
                          <td>
                            {mat.totalAmount - mat.amount}
                          </td>
                        </tr>
                      )
                    }
                  })
                ))
              }
              {
                market.untradeable.map((trade: Mats) => (
                  user.mats.map((mat: UserMats) => {
                    if (mat.id == trade.id && mat.totalAmount != 0) {
                      return (
                        <tr>
                          <td className="text-right">
                            {trade.name}
                          </td>
                          {user.gear.map((item: Gears) => (
                            item.stages.map((stage: any) => (
                              <td>{stage[trade.id]}</td>
                            ))
                          ))}
                          <td>
                            {mat.totalAmount}
                          </td>
                          <td>
                            {mat.amount}
                          </td>
                          <td>
                            {mat.totalAmount - mat.amount}
                          </td>
                        </tr>
                      )
                    }
                  })
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
})
