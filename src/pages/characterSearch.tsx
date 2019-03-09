import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { CharacterData } from '../components/characterData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterSelectDropdown } from '../components/characterSelectDropdown';
import { CharacterNeeds } from '../components/characterNeeds';
import { CharacterMember } from '../components/characterMember';
import { CharacterLeader } from '../components/characterLeader';
import { CharacterParse } from '../components/characterParse';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import { observer } from 'mobx-react';
import { user } from '../store/userStore';
import Badge from 'reactstrap/lib/Badge';
import classnames = require('classnames');

@observer
export default class CharacterSearch extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Character search" />
        <div className="content">
          <Nav tabs className="justify-content-end">
            <NavItem>
              <NavLink
                className={classnames({ active: user.tab === 1 })}
                onClick={() => { user.toggle(1); }}
              >
                Character info
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: user.tab === 2 })}
                onClick={() => { user.toggle(2); }}
              >
                <FontAwesomeIcon icon="comments" className="mr-2" />
                Messages
              <Badge color="success" pill className="ml-1">58</Badge>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: user.tab === 3 })}
                onClick={() => { user.toggle(3); }}
              >
                Settings
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={user.tab}>
            <TabPane tabId={1}>
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
            </TabPane>
            <TabPane tabId={2}>
              <div className="card">
                <div className="card-body">
                  <h4>Messages</h4>
                </div>
              </div>
            </TabPane>
            <TabPane tabId={3}>
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
  }
}
