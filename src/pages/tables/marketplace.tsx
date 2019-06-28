import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { MarketTable } from '../../components/marketTable/component';
import { observer } from 'mobx-react-lite';
import gearContext from '../../store/gearContext';

export const Marketplace = observer(() => {
    const { isMarketEditMode, marketMats, toogleEditMode, isGodMode, toogleGodMode, handleSaveMats, goodAmount } = React.useContext(gearContext);
    return (
        <div className="content-wrapper">
            <PageHeader title="Marketplace" />
            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col text-right">
                                {isGodMode ?
                                    <button className="btn btn-success btn-sm mr-3" onClick={() => toogleGodMode()}>Save changes</button> :
                                    <button className="btn btn-danger btn-sm mr-3" onClick={() => toogleGodMode()}>Edit mats</button>
                                }
                                {isMarketEditMode ?
                                    goodAmount ?
                                        < button className="btn btn-success btn-sm" onClick={(e) => handleSaveMats(e)}>Save changes</button> :
                                        < button className="btn btn-secondary btn-sm" onClick={() => toogleEditMode()}>Cancel</button> :
                                    <button className="btn btn-primary btn-sm" onClick={() => toogleEditMode()}>Change amount</button>
                                }
                            </div>
                        </div>
                        {isGodMode &&
                            <form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            name="id"
                                            placeholder="Mat id"
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control form-control-sm"
                                            type="text"
                                            name="id"
                                            placeholder="Mat name"
                                        />
                                    </div>
                                    <div className="col">
                                        <select className="form-control form-control-sm">
                                            <option>Tradeable</option>
                                            <option>Bound</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        }
                        {
                            isGodMode ?
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <MarketTable
                                            title="Edit mats"
                                            items={marketMats}
                                            trade={false}
                                        />
                                    </div>
                                </div> :
                                <div className="row mb-2">
                                    <div className="col-5">
                                        <MarketTable
                                            title="Untradeable"
                                            items={marketMats.filter((mat: any) => { return !mat.isTradeable })}
                                            trade={false}
                                        />
                                    </div>
                                    <div className="col-7 d-flex flex-column">
                                        <MarketTable
                                            title="Tradeable"
                                            items={marketMats.filter((mat: any) => { return mat.isTradeable })}
                                            trade={true}
                                        />
                                    </div>
                                </div>
                        }

                    </div>
                </div>


            </div>
        </div >
    );
})

