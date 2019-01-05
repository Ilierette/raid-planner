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

interface HomeState {
  name: string,
  region: string,
  modal: boolean
}

export default class Home extends React.Component<HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "Letty",
      dpsCount: "605 871/sec",
      dpsImg: "https://i.imgur.com/UUojn3f.jpg",
      region: "eu",
      isMain: true,
      isBadge: true,
      reload: true,
    };
  }

  changeName = (e: any) => {
    if (!(e.key == 'Shift' || e.key == 'Control' || e.key == 'Alt')) {
      this.setState({
        reload: false,
        isBadge: false,
        name: e.target.value
      })
    }
    if (e.key == 'Enter') {
      this.setState({
        reload: true,
        name: e.target.value
      })
    }
  }

  changeRegion = (e: any) => {
    this.setState({
      region: e.target.value
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
      reload: true,
    })
  }

  returnHome = () => {
    this.setState({
      reload: false,
      name: "Letty"
    })
    setTimeout(() => {
      this.setState({
        reload: true,
        isBadge: true,
      })
    }, 1);
  }

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <div className="card bg-dark">
            <div className="card-body">
              <div className="char-data row mx-auto">
                <div className="col-1">
                  <button className="btn btn-outline-primary" onClick={() => this.returnHome()}>
                    <FontAwesomeIcon icon="home" />
                  </button>
                </div>
                <div className="col-11 reversed">
                  <form className="form-inline mb-2" onSubmit={(e: any) => this.handleSubmit(e)}>
                    <div className="form-group">
                      <CharacterSelectDropdown />
                      <input placeholder="Find other character" className="form-control ml-1 mr-1 bg-dark text-light" onKeyUp={(e: any) => this.changeName(e)} />
                      <select className="form-control mr-3 bg-dark text-light" onChange={(e: any) => this.changeRegion(e)}>
                        <option value="eu">EU</option>
                        <option value="na">NA</option>
                      </select>
                    </div>
                    <button className="btn btn-outline-primary">Search</button>
                  </form>
                </div>
              </div>
              {this.state.reload ?
                <div>
                  <CharacterData name={this.state.name} region={this.state.region} isMain={this.state.isMain} isBadge={this.state.isBadge} />
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
                        <CharacterParse dpsCount={this.state.dpsCount} dpsImg={this.state.dpsImg}/>
                      </div>
                    </div>
                  </div>
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
