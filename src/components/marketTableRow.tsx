import * as React from 'react';
import { user } from '../store/userStore';
import { market } from '../store/marketStore';
import { observer } from 'mobx-react';

interface MarketTableRowProps {
  item: any,
  index:any,
  trade: any,
}

@observer
export class MarketTableRow extends React.Component<MarketTableRowProps> {
  componentDidMount() {
    user.countTotal();
  }
  render() {
    const { item, index, trade } = this.props;
    return (
      <tr key={item.id}>
        {!trade && index==0 ?
          <td rowSpan={index}>
            {item.tier != "other" ? item.tier : ""}
          </td> : null
        }
        <td className="text-right">
          {item.name}
        </td>
        <td>
        {
            user.mats.map((mat: any) => {
              if (item.id == mat.id) {
                return (
                  <span>{mat.totalAmount}</span>
                )}
              })
            }
        </td>
        <td>
          {
            user.mats.map((mat: any) => {
              if (item.id == mat.id) {
                return (
                  <input
                    type="number"
                    name={item.id} 
                    key={mat.id} 
                    defaultValue={mat.amount}
                    className="form-control text-center"
                    onChange={(e) => market.handleInputChange(e, mat.id)}
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
            {item.price ? parseFloat(item.price).toFixed(2) : 0}
          </td>
        }
        {this.props.trade &&
          <td className="text-left">
            {
              user.mats.map((mat: any) => {
                if (item.id == mat.id) {
                  return (
                    <span key={mat.id}>{mat.totalPrice ? parseFloat(mat.totalPrice).toFixed(2) : 0 }</span>
                  )
                }
              })
            }
          </td>
        }
      </tr>
    );
  }
}
