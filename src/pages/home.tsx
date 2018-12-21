import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { Form, FormGroup, Input, Card, CardBody, Button } from 'reactstrap';

import { CharacterData } from '../components/characterData'

interface HomeState {
  name: string,
  modal: boolean
}

export default class Home extends React.Component<HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "Letty",
      reload: true,
    };
  }

  changeName = (e: any) => {
    this.setState({
      reload: false,
      name: e.target.value
    })
    if (e.key == 'Enter') {
      this.setState({
        reload: true,
        name: e.target.value
      })
    }
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
                <Form className="form-inline mb-2" onSubmit={e => this.handleSubmit(e)}>
                  <FormGroup>
                    <Input placeholder="Character name" className="col mr-3 bg-dark text-light" onKeyUp={(e: any) => this.changeName(e)} />
                  </FormGroup>
                  <Button color="outline-primary">Search</Button>
                </Form>
              </div>

              {this.state.reload ?
                <CharacterData name={this.state.name} /> :
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
