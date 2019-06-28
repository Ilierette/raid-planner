import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { UserMats, Mats } from '../../models/interfaces';
import gearContext from '../../store/gearContext'

interface props {
  item: any,
  index: number,
  trade: boolean,
}

export const MarketRow = observer(({ item, index, trade }: props) => {
  const { mats, isMarketEditMode, handleInputChange, isGodMode } = React.useContext(gearContext)
  return (
    <tr key={item.id}>
      {!trade && !isGodMode && index == 0 ?
        <td rowSpan={index}>
          {item.tier != "other" ? item.tier : ""}
        </td> : null
      }
      {
        isGodMode &&
        <td>
          {item.id}
        </td>
      }
      <td className={isGodMode ? "" : "text-right"}>
        {item.name}
      </td>
      {
        !isGodMode &&
        <td>
          {
            mats.map((mat: UserMats, id: number) => {
              if (item.id == mat.id) {
                return (
                  <span key={mat.id + "" + id}>{mat.totalAmount.toLocaleString()}</span>
                )
              }
            })
          }
        </td>
      }
      {
        !isGodMode &&
        <td className={isMarketEditMode ? "edit-cell" : ""}>
          {
            mats.map((mat: UserMats, id: number) => {
              if (item.id == mat.id) {
                return (
                  <div key={mat.id + "" + id}>
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
      }
      {
        !isGodMode &&
        <td>
          {
            mats.map((mat: UserMats, id: number) => {
              if (item.id == mat.id) {
                return (
                  <span key={mat.id + "" + id}>{mat.totalAmount - mat.amount > 0 ? (mat.totalAmount - mat.amount).toLocaleString() : 0}</span>
                )
              }
            })
          }
        </td>
      }
      {
        trade &&
        <td className="text-left">
          {item.price ? item.price.toLocaleString() : 0}
        </td>
      }
      {
        trade &&
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
      {
        isGodMode &&
        <td>
          {
            mats.map((mat: UserMats) => {
              if (item.id == mat.id) {
                return (
                  item.isOutdated ?
                    <button className="btn btn-danger" onClick={() => item.isOutdated = false}>Outdated</button> :
                    <button className="btn btn-success" onClick={() => item.isOutdated = true}> In stock </button>
                )
              }
            })
          }
        </td>
      }
    </tr >
  )
})
