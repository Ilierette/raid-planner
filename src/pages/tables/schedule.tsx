import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { RaidTable } from '../../components/raidTable/component';
import '../../scss/content.scss';
import { observer, useObservable } from 'mobx-react-lite';
import { Raid } from '../../models/interfaces';
import { RaidRecruitTable } from '../../components/raidTable/raidRecruitTable';
import { Alert } from 'reactstrap';
import { db } from '../../store/firebase';
import { initDays } from '../../data/character';
import RaidStore from '../../store/raidContext'

export const Schedule = observer(() => {
  const { raids, uid, isLoading } = React.useContext(RaidStore);
  const createRaid = useObservable({
    type: "BT",
    maxMembers: 12,
  })
  const joinToRaid = useObservable({
    token: ""
  })
  const handleCreateRaid = (e: any) => {
    e.preventDefault();

    db.collection("raids").add({
      id: "",
      maxMembers: createRaid.maxMembers,
      minMembers: 4,
      raidLeaderId: uid,
      ratio: "",
      timestamp: "",
      type: createRaid.type
    }).then((docRef) => {
      db.collection("raids").doc(docRef.id).set({
        id: docRef.id,
      }, { merge: true })
      db.collection("raids").doc(docRef.id).collection('members').doc(uid).set({
        id: uid,
        isConfirmed: false,
        isStatic: true,
        days: initDays,
        notes: ""
      })
      db.collection("users").doc(uid).collection('raids').doc(docRef.id).set({
        id: docRef.id,
        isLeader: true
      })
    })
  }

  const joinByToken = (e: any) => {
    e.preventDefault()
    db.collection("raids").doc(joinToRaid.token).collection("members").doc(uid).set({
      id: uid,
      isConfirmed: false,
      isStatic: true,
      notes: "",
      days: initDays
    }).then(() => {
      db.collection("users").doc(uid).collection("raids").doc(joinToRaid.token).set({
        id: joinToRaid.token,
        isLeader: false
      })

      joinToRaid.token = ""
    })
  }

  return (
    <div className="content-wrapper">
      {
        false &&
        <div className="alert-box">
          <Alert color="success">
            Wait for confirmation / You have been invited, check messages!
            </Alert>
        </div>
      }
      <PageHeader title="Raid schedule" />
      <div className="content">
        {!isLoading && raids.map((raid: Raid, index: number) => (
          <RaidTable raid={raid} index={index} key={index} />
        ))}
        <div className="row mb-3">
          <div className="col-7">
            <div className="card">
              <div className="card-header">
                Join to raid
                </div>
              <div className="card-body">
                <div className="form-group row">
                  <label htmlFor="token" className="col-3 col-form-label text-right">Raid Token</label>
                  <div className="col-6">
                    <input type="text" className="form-control" value={joinToRaid.token} onChange={(e) => joinToRaid.token = e.target.value} />
                  </div>
                  <div className="col-2 d-flex">
                    <button className="btn btn-primary btn-sm align-self-center" onClick={(e) => joinByToken(e)} > Apply </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="card">
              <div className="card-header">
                Create raid
                </div>
              <div className="card-body">
                <div className="form-group row">
                  <label htmlFor="raid" className="col-3 col-form-label text-right">Raid type</label>
                  <select className="form-control col-8" onChange={(e) => createRaid.type = e.target.value}>
                    <option value="BT">BT</option>
                    <option value="VT">VT</option>
                    <option value="BT">TT</option>
                    <option value="VT">ET</option>
                  </select>
                  <label htmlFor="raid" className="col-3 col-form-label text-right">Raid size</label>
                  <select className="form-control col-8" onChange={(e) => createRaid.maxMembers = parseInt(e.target.value)}>
                    <option value="12">12</option>
                    <option value="6">6</option>
                    <option value="4">4</option>
                  </select>
                  <label htmlFor="raid" className="col-3 col-form-label text-right">Loot</label>
                  <select className="form-control col-8">
                    <option value="gold">Gold bid</option>
                    <option value="dkp">DKP</option>
                    <option value="priority">Priority list</option>
                  </select>
                  <div className="col-12 mt-2 text-right">
                    <button className="btn btn-primary btn-sm align-self-center" onClick={(e) => handleCreateRaid(e)}>Create </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header">
                Look for raid
                </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row">
                      <label htmlFor="raid" className="col-3 col-form-label text-right">Select character</label>
                      <select className="form-control col-3">
                        <option value="letty">Letty</option>
                      </select>
                      <div className="col-3 d-flex">
                        <div className="form-check align-self-center mx-auto">
                          <input type="checkbox" className="form-check-input" id="class" />
                          <label className="form-check-label" htmlFor="class">Only my class</label>
                        </div>
                      </div>
                      <div className="col-1 d-flex">
                        <button className="btn btn-primary btn-sm align-self-center mx-auto">Search </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <RaidRecruitTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})
