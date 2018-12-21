import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { Form, FormGroup, Input, Card, CardBody, Button } from 'reactstrap';

import RaidCharacterData from '../components/raidCharacterData'
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
      modal: false
    };
  }

  changeName = (e: any) => {
    this.setState({
      name: e.target.value
    })
    if (e.key == 'Enter') {
      this.setState({
        modal: !this.state.modal,
      });
    }
  }
  toogle = (e: any) => {
    e.preventDefault;
    this.setState({
      modal: !this.state.modal,
    });
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


              <CharacterData name={this.state.name} />
              <RaidCharacterData modal={this.state.modal} toogle={this.toogle} name={this.state.name} />

            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
