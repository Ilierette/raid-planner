import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Gears, Mats, UserMats, Stages } from '../../models/interfaces';
import GearStore from '../../store/gearStore'

export const GearTable = observer(() => {
  const { gear, mats, tradeable, untradeable } = React.useContext(GearStore)
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
                {gear.map((item: Gears) => (
                  <th colSpan={item.stages.length}>
                    {item.name}
                  </th>
                ))}
                <th rowSpan={2} style={{ width: 90 }} >All</th>
                <th rowSpan={2} style={{ width: 90 }} >Owned</th>
                <th rowSpan={2} style={{ width: 90 }} >Left</th>
              </tr>
              <tr>
                {gear.map((item: Gears) => (
                  item.stages.map((stage: Stages) => (
                    <th>{stage.name}</th>
                  ))
                ))}
              </tr>
            </thead>
            <tbody>
              {
                tradeable.map((trade: Mats) => (
                  mats.map((mat: UserMats) => {
                    if (mat.id == trade.id && mat.totalAmount != 0) {
                      return (
                        <tr>
                          <td className="text-right">
                            {trade.name}
                          </td>
                          {gear.map((item: Gears) => (
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
                untradeable.map((trade: Mats) => (
                  mats.map((mat: UserMats) => {
                    if (mat.id == trade.id && mat.totalAmount != 0) {
                      return (
                        <tr>
                          <td className="text-right">
                            {trade.name}
                          </td>
                          {gear.map((item: Gears) => (
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