import * as React from 'react';
import { observer } from 'mobx-react';
import { user } from '../store/userStore';
import { market } from '../store/marketStore';

@observer
export class GearTable extends React.Component {
  componentDidMount(){
    user.countTotal();
  }
  render() {
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
                  {user.gear.map((item: any) => (
                    <th colSpan={item.stages.length}>
                      {item.name}
                    </th>
                  ))}
                  <th rowSpan={2}>Total</th>
                </tr>
                <tr>
                  {user.gear.map((item: any) => (
                    item.stages.map((stage: any) => (
                      <th>{stage.name}</th>
                    ))
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  market.tradeable.map((trade: any) => (
                    <tr>
                      <td className="text-right">
                        {trade.name}
                      </td>
                      {user.gear.map((item: any) => (
                        item.stages.map((stage: any) => (
                          <td>{stage[trade.id]}</td>
                        ))
                      ))}
                      <td></td>


                    </tr>
                  ))
                }
                {
                  market.untradeable.map((untrade: any) => (
                    <tr>
                      <td className="text-right">
                        {untrade.name}
                      </td>
                      {user.gear.map((item: any) => (
                        item.stages.map((stage: any) => (
                          <td>{stage[untrade.id]}</td>
                        ))
                      ))}
                      <td>

                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
