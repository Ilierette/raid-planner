import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { UserMats, Mats } from '../../models/interfaces';
import GearStore from '../../store/gearStore'

interface props {
  item: Mats,
  index: number,
  trade: boolean,
}

export const MarketRow = observer(({ item, index, trade }: props) => {
  const { mats, isMarketEditMode, handleInputChange } = React.useContext(GearStore)
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
          mats.map((mat: UserMats) => {
            if (item.id == mat.id) {
              return (
                <span>{mat.totalAmount.toLocaleString()}</span>
              )
            }
          })
        }
      </td>
      <td className={isMarketEditMode ? "edit-cell" : ""}>
        {
          mats.map((mat: UserMats) => {
            if (item.id == mat.id) {
              return (
                <div>
                  {isMarketEditMode ?
                    <input
                      type="number"
                      name={item.id}
                      key={mat.id}
                      defaultValue={mat.amount + ""}
                      className="form-control text-center"
                      onChange={(e) => handleInputChange(e, mat.id)}
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
          mats.map((mat: UserMats) => {
            if (item.id == mat.id) {
              return (
                <span>{mat.totalAmount - mat.amount > 0 ? (mat.totalAmount - mat.amount).toLocaleString() : 0}</span>
              )
            }
          })
        }
      </td>
      {trade &&
        <td className="text-left">
          {item.price ? item.price.toLocaleString() : 0}
        </td>
      }
      {trade &&
        <td className="text-left">
          {
            mats.map((mat: UserMats) => {
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
  )
})
