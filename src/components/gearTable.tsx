import * as React from 'react';
import market from '../data/market'

interface GearProps {
  title: string,
  items: [],
}

interface GearState {
  tradeable: [],
  untradeable: [],
}

export class GearTable extends React.Component<GearProps, GearState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tradeable: market.basic,
      untradeable: market.untradeable,
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <h5 className="card-title">{this.props.title}</h5>
            <table className="table table-sm text-center">
              <thead>
                <tr>
                  <th rowSpan={2} className="text-right">
                    Mats
                  </th>
                  {this.props.items.map((item: any) => (
                    <th colSpan={item.stages.length}>
                      {item.name}
                    </th>
                  ))}
                </tr>
                <tr>
                  {this.props.items.map((item: any) => (
                    item.stages.map((stage: any) => (
                      <th>{stage.name}</th>
                    ))
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  this.state.tradeable.map((trade: any) => (
                    <tr>
                      <td className="text-right">
                        {trade.name}
                      </td>
                      {this.props.items.map((item: any) => (
                        item.stages.map((stage: any) => (
                          <td>{stage[trade.id]}</td>
                        ))
                      ))}
                    </tr>
                  ))
                }
                {
                  this.state.untradeable.map((untrade: any) => (
                    <tr>
                      <td className="text-right">
                        {untrade.name}
                      </td>
                      {this.props.items.map((item: any) => (
                        item.stages.map((stage: any) => (
                          <td>{stage[untrade.id]}</td>
                        ))
                      ))}
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
