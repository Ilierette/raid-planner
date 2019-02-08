import * as React from 'react';
import { user } from '../store/userStore';
import { market } from '../store/marketStore';
import { observer } from 'mobx-react';
import { UserMats, Mats } from '../models/interfaces';

interface MarketTableRowProps {
  item: any,
  index: number,
  trade: boolean,
}

@observer
export class MarketTableRow extends React.Component<MarketTableRowProps> {
  render() {
    const { item, index, trade } = this.props;
    return (
      <tr key={item.id}>
        {!trade && index == 0 ?
          <td rowSpan={index}>
            {item.tier != "other" ? item.tier : ""}
          </td> : null
        }
        <td className="text-right">
          {item.name}
        </td>
        <td>
          {
            user.mats.map((mat: UserMats) => {
              if (item.id == mat.id) {
                return (
                  <span>{mat.totalAmount}</span>
                )
              }
            })
          }
        </td>
        <td>
          {
            user.mats.map((mat: UserMats) => {
              if (item.id == mat.id) {
                return (
                  <input
                    type="number"
                    name={item.id}
                    key={mat.id}
                    defaultValue={mat.amount + ""}
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
          {
            user.mats.map((mat: UserMats) => {
              if (item.id == mat.id) {
                return (
                  <span>{mat.totalAmount - mat.amount > 0 ? mat.totalAmount - mat.amount : 0 }</span>
                )
              }
            })
          }
        </td>
        {this.props.trade &&
          <td>
            {item.price ? parseFloat(item.price).toFixed(2) : 0}
          </td>
        }
        {this.props.trade &&
          <td className="text-left">
            {
              user.mats.map((mat: UserMats) => {
                if (item.id == mat.id) {
                  return (
                    <span key={mat.id}>{mat.totalPrice}</span>
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
