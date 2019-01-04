import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { CharacterData } from '../components/characterData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CharacterSelectDropdown } from '../components/characterSelectDropdown';

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
    this.setState({
      reload: false,
      isBadge: false,
      name: e.target.value
    })
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

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <div className="card bg-dark">
            <div className="card-body">
              <div className="char-data mx-auto px-5">
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

              {this.state.reload ?
                <CharacterData name={this.state.name} region={this.state.region} isMain={this.state.isMain} isBadge={this.state.isBadge} /> :
                <div className="card bg-dark text-white char-data mx-auto">
                  <div className="loader"></div>
                </div>
              }

              <div className="char-details row mx-auto">
                <div className="col-6 mt-2">
                  <div className="card text-center text-white bg-dark border-primary">
                    <div className="card-body">
                      <h5>DPS Parse</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{this.state.dpsCount}</h6>
                      <a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Update parse</a>
                    </div>
                    <img className="card-img-bottom" src={this.state.dpsImg} />
                  </div>
                </div>
                <div className="col-6 mt-2">
                  <div className="card text-center text-white bg-dark border-primary">
                    <div className="card-body">
                      <h5>Needs</h5>
                      <ul className="list-unstyled">
                        <li>TT Ring  <span className="badge badge-success ml-1 my-auto">awakened</span> </li>
                        <li>TT Earring</li>
                        <li><a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add EQ</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-6 mt-2">
                  <div className="card text-center text-white bg-dark border-primary">
                    <div className="card-body">
                      <h5>Raid member</h5>
                      <ul className="list-unstyled">
                        <li><a href="" >TT Raid List <span className="badge badge-primary ml-1 my-auto">static</span> </a></li>
                        <li><a href="" >VT Raid List <span className="badge badge-secondary ml-1 my-auto">sub</span> </a></li>
                      </ul>

                    </div>
                  </div>
                </div>
                <div className="col-6 mt-2">
                  <div className="card text-center text-white bg-dark border-primary">
                    <div className="card-body">
                      <h5>Raid leader</h5>
                      <ul className="list-unstyled">
                        <li><a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Add raid</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="card text-center text-white bg-dark border-primary">
                    <div className="card-body">
                      <h5>Timetable</h5>
                      <ul className="list-unstyled">
                        <li><a href="" ><FontAwesomeIcon icon="plus" className="mr-1" /> Edit timetable</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
