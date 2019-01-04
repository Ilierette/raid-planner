import * as React from 'react';

interface MarketProps {
  title: string,
  items: [],
  trade: boolean,
  mats: [],
  handleInputChange: any
}

export class MarketTable extends React.Component<MarketProps> {
  constructor(props: any) {
    super(props);
  }
  render() {

    return (
      <div className="table-responsive">
        <h5 className="card-title">{this.props.title}</h5>
        <table className="table table-sm text-center">
          <thead>
            <tr>
              <th className="text-right">
                Name
                  </th>
              <th style={{ width: "60px" }}>
                All
                  </th>
              <th style={{ width: "70px" }}>
                Owned
                  </th>
              <th style={{ width: "70px" }}>
                Rest
                  </th>
              {this.props.trade &&
                <th style={{ width: "95px" }}>
                  Market price
                    </th>
              }
              {this.props.trade &&
                <th style={{ width: "82px" }}>
                  Total Price
                    </th>
              }
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item: any) => (
              <tr key={item.id}>
                <td className="text-right">
                  {item.name}
                </td>
                <td>
                </td>
                <td>
                  {
                    this.props.mats.map((mat: any) => {
                      if (item.id == mat.id) {
                        return (
                          <input
                            type="number" 
                            name={item.id} key={mat.id} defaultValue={mat.amount ? mat.amount : 0} 
                            className="form-control text-center"
                            onChange={(e) => this.props.handleInputChange(e, mat.id)}
                            min="0"
                          />
                        )
                      }
                    })
                  }
                </td>
                <td>

                </td>
                {this.props.trade &&
                  <td>
                    {parseFloat(item.price).toFixed(2)}
                  </td>
                }
                {this.props.trade &&
                  <td>
                    {
                      this.props.mats.map((mat: any) => {
                        if (item.id == mat.id) {
                          return (
                            <span key={mat.id}>{mat.amount ? (mat.amount * item.price).toFixed(2) : 0}</span>
                          )
                        }
                      })
                    }
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
