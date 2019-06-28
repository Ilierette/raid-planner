import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useObservable, observer } from 'mobx-react-lite';
import GlobalContext from '../../store/globalContext';
import { db } from '../../store/firebase';

export const Parse = observer(() => {
    const { uid } = React.useContext(GlobalContext)
    const state = useObservable({
        isEditMode: false,
        dpsCount: null,
        dpsImg: null
    })
    React.useEffect(() => {
        db.collection("users").doc(uid).onSnapshot((doc) => {
            state.dpsCount = doc.data().dpsParseValue;
            state.dpsImg = doc.data().dpsParse;
        })
    }, [])
    const toggleEditMode = (e: any) => {
        e.preventDefault();
        state.isEditMode = true
    }
    const submit = (e: any) => {
        e.preventDefault();
        state.isEditMode = false

        db.collection("users").doc(uid).update({
            dpsParseValue: state.dpsCount,
            dpsParse: state.dpsImg
        })

    }
    return (
        <div className="card text-center text-white bg-dark border-primary">
            {!state.isEditMode ?
                <div className="card-body">
                    <h5>DPS Parse</h5>
                    {state.dpsCount && <h6 className="card-subtitle mb-2 text-muted">{state.dpsCount}</h6>}
                    {state.dpsImg && <div className="mt-2"><img src={state.dpsImg} /></div>}
                </div> :
                <div className="card-body">
                    <h5>DPS Parse</h5>
                    <div className="form-group">
                        <input placeholder="DPS value" value={state.dpsCount} className="form-control bg-dark text-light" onChange={(e) => state.dpsCount = e.target.value} />
                        <input placeholder="DPS img link" value={state.dpsImg} className="form-control bg-dark text-light" onChange={(e) => state.dpsImg = e.target.value} />
                    </div>
                </div>
            }
            <div className="card-footer text-muted">
                {
                    state.isEditMode ?
                        <a href="#" onClick={(e) => submit(e)}><FontAwesomeIcon icon="plus" className="mr-1" />Save</a>
                        :
                        <a href="#" onClick={(e) => toggleEditMode(e)}><FontAwesomeIcon icon="plus" className="mr-1" /> Edit</a>
                }

            </div>
        </div>
    );
})
