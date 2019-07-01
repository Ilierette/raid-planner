import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { MarketTable } from '../../components/marketTable/component';
import { observer, useObservable } from 'mobx-react-lite';
import gearContext from '../../store/gearContext';
import { db } from '../../store/firebase';
import raidContext from '../../store/raidContext';

export const Marketplace = observer(() => {
    const { isMarketEditMode, marketMats, toogleEditMode, isGodMode, toogleGodMode, handleSaveMats, goodAmount, isLoading, isLoadingMats } = React.useContext(gearContext);
    const { users } = React.useContext(raidContext)
    const mat = useObservable({
        id: "",
        name: "",
        shortName: "",
        tradeable: "",
        tier: "other",
        goodMats: true
    })
    const addMat = (e: any) => {
        e.preventDefault()

        let tradeBool = true;
        if (mat.tradeable == "false") {
            tradeBool = false
        }

        db.collection("mats").doc(mat.id).set({
            id: mat.id,
            isActive: true,
            isOutdated: false,
            isTradeable: tradeBool,
            name: mat.name,
            shortName: mat.shortName,
            tier: mat.tier
        }).then(() => {
            users.map((user: any) => {
                db.collection("users").doc(user.id).collection("mats").doc(mat.id).set({
                    id: mat.id,
                    show: true,
                    amount: 0
                }, { merge: true })
            })
        })

        toogleGodMode();
        mat.goodMats = true
    }
    return (
        <div className="content-wrapper">
            <PageHeader title="Marketplace" />
            {
                !isLoading && !isLoadingMats &&
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col text-right">
                                    {isGodMode ?
                                        mat.goodMats ?
                                            <button className="btn btn-secondary btn-sm mr-3" onClick={() => toogleGodMode()}>Cancel</button> :
                                            <button className="btn btn-success btn-sm mr-3" onClick={((e) => addMat(e))}> Add mats </button> :
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
                                                value={mat.id}
                                                onChange={(e) => { mat.id = e.target.value; mat.goodMats = false }}
                                                placeholder="Mat id"
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                value={mat.name}
                                                onChange={(e) => { mat.name = e.target.value; mat.goodMats = false }}
                                                placeholder="Mat name"
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                className="form-control form-control-sm"
                                                type="text"
                                                name="name"
                                                value={mat.shortName}
                                                onChange={(e) => { mat.shortName = e.target.value; mat.goodMats = false }}
                                                placeholder="Mat display name"
                                            />
                                        </div>
                                        <div className="col">
                                            <select className="form-control form-control-sm" onChange={(e) => { mat.tradeable = e.target.value; mat.goodMats = false }}>
                                                <option value="true">Tradeable</option>
                                                <option value="false">Bound</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select className="form-control form-control-sm" onChange={(e) => { mat.tier = e.target.value; mat.goodMats = false }}>
                                                <option value="other">other</option>
                                                <option value="common">common</option>
                                                <option value="BT">BT</option>
                                                <option value="VT">VT</option>
                                                <option value="TT">TT</option>
                                                <option value="ET">ET</option>
                                                <option value="PVP">PVP</option>
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
            }

        </div >
    );
})

