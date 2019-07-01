import * as React from 'react';
import { observer } from 'mobx-react-lite';
import gearContext from '../../store/gearContext'
import { toJS } from 'mobx';

export const GearTable = observer(() => {
  const { gear, mats, marketMats } = React.useContext(gearContext)
  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <h5 className="card-title"></h5>
          <table className="table table-sm text-center">
            <thead>
              <tr>
                <th rowSpan={2} className="text-right">
                  Mats
                  </th>
                {gear && gear.map((item: any, id: number) => (
                  <th colSpan={item.stages.length} key={item.name + "" + id}>
                    {item.name}
                  </th>
                ))}
                <th rowSpan={2}>All</th>
                <th rowSpan={2}>Owned</th>
                <th rowSpan={2}>Left</th>
              </tr>
              <tr>
                {gear && gear.map((gear: any) => (
                  gear.stages.map((stage: any) => (
                    <th key={gear.id + "-" + stage.id} >{stage.name}</th>
                  ))
                ))}
              </tr>
            </thead>
            <tbody>
              {
                marketMats.map((trade: any) => (
                  mats.map((mat: any, id: any) => {
                    if (mat.id == trade.id && mat.totalAmount != 0) {
                      return (
                        <tr key={trade.name + "" + id}>
                          <td className="text-right">
                            {trade.shortName}
                          </td>
                          {gear.map((item: any) => (
                            item.stages.map((stage: any, id: number) => (
                              <td key={item.name + stage.name + id}>{stage[trade.id]}</td>
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
