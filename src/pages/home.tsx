import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { CharacterData } from '../components/characterData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterSelectDropdown } from '../components/characterSelectDropdown';
import { CharacterNeeds } from '../components/characterNeeds';
import { CharacterMember } from '../components/characterMember';
import { CharacterLeader } from '../components/characterLeader';
import { CharacterTimetable } from '../components/characterTimetable';
import { CharacterParse } from '../components/characterParse';

import { observer } from 'mobx-react';
import { user } from '../store/userStore';

@observer
export default class Home extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <div className="card bg-dark">
            <div className="card-body">
              <div className="char-data row mx-auto">
                <div className="col-1">
                  <button className="btn btn-outline-primary" onClick={() => user.returnHome()}>
                    <FontAwesomeIcon icon="home" />
                  </button>
                </div>
                <div className="col-11 reversed">
                  <form className="form-inline mb-2" onSubmit={(e: any) => user.handleSubmit(e)}>
                    <div className="form-group">
                      <CharacterSelectDropdown />
                      <input placeholder="Find other character" className="form-control ml-1 mr-1 bg-dark text-light" onKeyUp={(e: any) => user.changeName(e)} />
                      <select className="form-control mr-3 bg-dark text-light" onChange={(e: any) => user.changeRegion(e)}>
                        <option value="eu">EU</option>
                        <option value="na">NA</option>
                      </select>
                    </div>
                    <button className="btn btn-outline-primary">Search</button>
                  </form>
                </div>
              </div>
              {user.reload ?
                <div>
                  <CharacterData name={user.name} region={user.region} isMain={user.isMain} isBadge={user.isBadge} />
                  {
                    !user.isLoadingData &&
                      <div className="char-details mx-auto">
                        <div className="card-group">
                          <CharacterNeeds />
                          <CharacterMember />
                          <CharacterLeader />
                        </div>
                        <div className="row mt-2">
                          <div className="col-12 ">
                            <CharacterTimetable />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-12">
                            <CharacterParse dpsCount={user.dpsCount} dpsImg={user.dpsImg} />
                          </div>
                        </div>
                      </div>
                  }
                </div> :
                <div className="card bg-dark text-white char-data mx-auto">
                  <div className="loader"></div>
                </div>
              }
            </div>
          </div>
        </div>
      </div >
    );
  }
}
