import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { MarketTable } from '../../components/marketTable/component';
import { observer } from 'mobx-react-lite';
import { Tiers } from '../../models/interfaces';
import GearStore from '../../store/gearStore';

export const Marketplace = observer(() => {
    const { tierList, isMarketEditMode, untradeable, tradeable, handleTierChange, toogleEditMode } = React.useContext(GearStore);
    return (
        <div className="content-wrapper">
            <PageHeader title="Marketplace" />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-10">
                                <form>
                                    {tierList.map((tier: Tiers) => (
                                        <div className="form-check form-check-inline" key={tier.name}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={tier.name}
                                                onClick={(e) => handleTierChange(e)}
                                                defaultChecked={tier.show}
                                            />
                                            <label className="form-check-label" htmlFor={tier.name}>{tier.name}</label>
                                        </div>
                                    ))}
                                </form>
                            </div>
                            <div className="col-2 text-right">
                                {isMarketEditMode ?
                                    <button className="btn btn-success btn-sm" onClick={() => toogleEditMode()}>Save changes</button> :
                                    <button className="btn btn-primary btn-sm" onClick={() => toogleEditMode()}>Edit</button>
                                }
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-5">
                                <MarketTable
                                    title="Untradeable"
                                    items={untradeable}
                                    trade={false}
                                />
                            </div>
                            <div className="col-7 d-flex flex-column">
                                <MarketTable
                                    title="Tradeable"
                                    items={tradeable}
                                    trade={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})

