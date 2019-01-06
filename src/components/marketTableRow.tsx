import * as React from 'react';

interface MarketTableRowProps {
  item: any,
  index:any,
  trade: any,
  mats: any,
  handleInputChange: any
}

export class MarketTableRow extends React.Component<MarketTableRowProps> {
  render() {
    const { item, index } = this.props;
    return (
      <tr key={item.id}>
        {!this.props.trade && index==0 ?
          <td rowSpan={index}>
            {item.tier != "other" ? item.tier : ""}
          </td> : null
        }
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
                    name={item.id} 
                    key={mat.id} 
                    defaultValue={mat.amount ? mat.amount : 0}
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
            {item.price ? parseFloat(item.price).toFixed(2) : 0}
          </td>
        }
        {this.props.trade &&
          <td className="text-left">
            {
              this.props.mats.map((mat: any) => {
                if (item.id == mat.id) {
                  return (
                    <span key={mat.id}>{mat.amount && item.price ? (mat.amount * item.price).toFixed(2) : 0}</span>
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
