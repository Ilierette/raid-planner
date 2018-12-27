import * as React from 'react';
import { Card, CardBody } from 'reactstrap';

interface MarketProps {
  title: string,
  items: [],
  trade: boolean,
  mats: [],
}

export class MarketTable extends React.Component<MarketProps> {
  constructor(props: any) {
    super(props);
  }
  render() {

    return (
      <Card>
        <CardBody>
          <div className="table-responsive">
            <h5 className="card-title">{this.props.title}</h5>
            <table className="table table-sm text-center">
              <thead>
                <tr>
                  <th className="text-right">
                    Name
                  </th>
                  <th>
                    All
                  </th>
                  <th>
                    Owned
                  </th>
                  <th>
                    Rest
                  </th>
                  {this.props.trade &&
                    <th>
                      Market price
                    </th>
                  }
                  {this.props.trade &&
                    <th>
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
                              <input type="number" name={item.id} key={mat.id} defaultValue={mat.amount} className="form-control"/>
                            )
                          }
                        })
                      }
                    </td>
                    <td>
                    </td>
                    {this.props.trade &&
                      <td>
                        {item.price}
                      </td>
                    }
                    {this.props.trade &&
                      <td>

                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    );
  }
}
