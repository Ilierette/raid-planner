import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { CharacterData } from '../components/characterData/component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterSelect } from '../components/characterData/characterSelect';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { observer, useObservable } from 'mobx-react-lite';
import Badge from 'reactstrap/lib/Badge';
import classnames = require('classnames');
import { CharacterDataSearch } from '../components/characterDataSearch';
import { Parse } from '../components/characterAdditionalData/parse';
import { Leader } from '../components/characterAdditionalData/leader';
import { Member } from '../components/characterAdditionalData/member';
import { Needs } from '../components/characterAdditionalData/needs';

import GlobalStore from '../store/globalStore';

export const CharacterSearch = observer(() => {
  const { char, isLoadingData, needs, dpsCount, dpsImg, isMain } = React.useContext(GlobalStore)

  const state = useObservable({
    searchName: "",
    searchRegion: "EU",
    isBadge: true,
    reload: true,
    isGearEditMode: false,
    isMarketEditMode: false,
    tab: 1,
    searchSwitch: true,
  })

  const changeName = (e: any) => {
    if (!(e.key == 'Shift' || e.key == 'Control' || e.key == 'Alt')) {
      state.reload = false;
      state.isBadge = false;
      state.searchSwitch = false;
      state.searchName = e.target.value;
    }
    if (e.key == 'Enter') {
      state.reload = true;
      state.searchSwitch = false;
      state.searchName = e.target.value;
    }
  }

  const changeRegion = (e: any) => {
    state.searchRegion = e.target.value;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    state.searchSwitch = false;
    state.reload = true;
  }

  const returnHome = () => {
    state.searchSwitch = true;
  }

  const toggle = (tab: number) => {
    state.tab = tab;
  }
  return (
    <div className="content-wrapper">
      <PageHeader title="Character search" />
      <div className="content">
        <Nav tabs className="justify-content-end">
          <NavItem>
            <NavLink
              className={classnames({ active: state.tab === 1 })}
              onClick={() => { toggle(1); }}
            >
              Character info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: state.tab === 2 })}
              onClick={() => { toggle(2); }}
            >
              Additional data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: state.tab === 3 })}
              onClick={() => { toggle(3); }}
            >
              <FontAwesomeIcon icon="comments" className="mr-2" />
              Messages
              <Badge color="success" pill className="ml-1">58</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: state.tab === 4 })}
              onClick={() => { toggle(4); }}
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={state.tab}>
          <TabPane tabId={1}>
            <div className="card bg-dark">
              <div className="card-body">
                <div className="char-data row mx-auto">
                  <div className="col-1">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => returnHome()}>
                      <FontAwesomeIcon icon="home" />
                    </button>
                  </div>
                  <div className="col-11 reversed">
                    <form className="form-inline mb-2" onSubmit={(e: any) => handleSubmit(e)}>
                      <div className="form-group">
                        <CharacterSelect />
                        <input placeholder="Find other character" className="form-control ml-1 mr-1 bg-dark text-light" onKeyUp={(e: any) => changeName(e)} />
                        <select className="form-control mr-3 bg-dark text-light" onChange={(e: any) => changeRegion(e)}>
                          <option value="eu">EU</option>
                          <option value="na">NA</option>
                        </select>
                      </div>
                      <button className="btn btn-outline-primary">Search</button>
                    </form>
                  </div>
                </div>
                {state.reload ?
                  <div>
                    {state.searchSwitch ?
                      <CharacterData char={char} isLoadingData={isLoadingData} isMain={isMain} isBadge={state.isBadge} /> :
                      <CharacterDataSearch name={state.searchName} region={state.searchRegion} />
                    }
                  </div> :
                  <div className="card bg-dark text-white char-data mx-auto">
                    <div className="loader"></div>
                  </div>
                }
              </div>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="card bg-dark">
              <div className="card-body">
                {
                  !isLoadingData &&
                  <div className="char-details mx-auto">
                    <div className="card-group">
                      <Needs need={needs} />
                      <Member />
                      <Leader />
                    </div>
                    <div className="row mt-2">
                      <div className="col-12">
                        <Parse dpsCount={dpsCount} dpsImg={dpsImg} />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </TabPane>
          <TabPane tabId={3}>
            <div className="card">
              <div className="card-body">
                <h4>Messages</h4>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={4}>
            <div className="card">
              <div className="card-body">
                <h4>Settings</h4>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div >
  );
})
