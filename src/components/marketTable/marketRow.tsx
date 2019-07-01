import * as React from 'react';
import { observer } from 'mobx-react-lite';
import gearContext from '../../store/gearContext'
import { db } from '../../store/firebase';

interface props {
  item: any,
  index: number,
  trade: boolean,
}

export const MarketRow = observer(({ item, index, trade }: props) => {
  const { mats, isMarketEditMode, handleInputChange, isGodMode } = React.useContext(gearContext)
  const updateItem = (item:any) => {
    item.isOutdated = !item.isOutdated;
    db.collection("mats").doc(item.id).update({
      isOutdated: item.isOutdated
    })
  }
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
        {item.shortName}
      </td>
      {
        !isGodMode &&
        <td>
          {
            mats.map((mat: any, id: number) => {
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
            mats.map((mat: any, id: number) => {
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
            mats.map((mat: any, id: number) => {
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
            mats.map((mat: any) => {
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
            mats.map((mat: any, id: any) => {
              if (item.id == mat.id) {
                return (
                  <span key={id}>
                    {
                      item.isOutdated ?
                        <button className="btn btn-danger" onClick={() => { updateItem(item) }}>Outdated</button> :
                        <button className="btn btn-success" onClick={() => { updateItem(item) }}> In stock </button>
                    }
                  </span>

                )
              }
            })
          }
        </td>
      }
    </tr >
  )
})
