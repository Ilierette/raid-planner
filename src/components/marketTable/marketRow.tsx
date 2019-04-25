import * as React from 'react';
import { observer } from 'mobx-react';
import { UserMats, Mats } from '../../models/interfaces';
import { user } from '../../store/userStore';
import { market } from '../../store/marketStore';

interface MarketRowProps {
  item: Mats,
  index: number,
  trade: boolean,
}

@observer
export class MarketRow extends React.Component<MarketRowProps> {
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
                  <span>{mat.totalAmount.toLocaleString()}</span>
                )
              }
            })
          }
        </td>
        <td className={market.isMarketEditMode && "edit-cell"}>
          {
            user.mats.map((mat: UserMats) => {
              if (item.id == mat.id) {
                return (
                  <div>
                    {market.isMarketEditMode ?
                      <input
                        type="number"
                        name={item.id}
                        key={mat.id}
                        defaultValue={mat.amount + ""}
                        className="form-control text-center"
                        onChange={(e) => market.handleInputChange(e, mat.id)}
                        min="0"
                      /> :
                      <span>{mat.amount + ""}</span>
                    }
                  </div>

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
                  <span>{mat.totalAmount - mat.amount > 0 ? (mat.totalAmount - mat.amount).toLocaleString() : 0}</span>
                )
              }
            })
          }
        </td>
        {this.props.trade &&
          <td className="text-left">
            {item.price ? item.price.toLocaleString() : 0}
          </td>
        }
        {this.props.trade &&
          <td className="text-left">
            {
              user.mats.map((mat: UserMats) => {
                if (item.id == mat.id) {
                  return (
                    <span key={mat.id}>{mat.totalPrice && mat.totalPrice.toLocaleString()}</span>
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
