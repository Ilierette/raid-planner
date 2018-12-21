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

  render() {
    return (
      <div className="content-wrapper">
        <PageHeader title="Home" />
        <div className="content">
          <Card>
            <CardBody>
              <Form className="form-inline mb-5" onSubmit={e => { e.preventDefault(); }}>
                <FormGroup>
                  <Input placeholder="Character name" className="mr-3" onKeyPress={(e: any) => this.changeName(e)} />
                </FormGroup>
                <Button color="primary" onClick={(e: any) => this.toogle(e)}>
                  Search
                </Button>
              </Form>


              {this.state.reload ?
                <CharacterData name={this.state.name} /> :
                <div className="card bg-dark text-white char-data mx-auto">
                  <div className="loader"></div>
                </div>
              }
              
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
