import * as React from 'react';
import { PageHeader } from '../../components/pageHeader';
import { RaidTable } from '../../components/raidTable/component';
import '../../scss/content.scss';
import { observer } from 'mobx-react-lite';
import { Raid } from '../../models/interfaces';
import { RaidRecruitTable } from '../../components/raidTable/raidRecruitTable';
import { Alert } from 'reactstrap';
import RaidStore from '../../store/raidStore'

export const Schedule = observer(() => {
  const { raids } = React.useContext(RaidStore);
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
        {raids.map((raid: Raid, index: number) => (
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
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-2 d-flex">
                    <button className="btn btn-primary btn-sm align-self-center" > Apply </button>
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
                  <select className="form-control col-6">
                    <option value="BT">BT</option>
                    <option value="VT">VT</option>
                    <option value="BT">TT</option>
                    <option value="VT">ET</option>
                  </select>
                  <div className="col-2 d-flex">
                    <button className="btn btn-primary btn-sm align-self-center">Create </button>
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
