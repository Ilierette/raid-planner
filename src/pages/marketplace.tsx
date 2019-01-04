import * as React from 'react';
import { PageHeader } from '../components/pageHeader';
import { MarketTable } from '../components/marketTable';
import { Card, CardBody } from 'reactstrap';
import market from '../data/market';
import members from '../data/users';

interface MarketplaceState {
    tradeable: [],
    untradeable: [],
    userMats: []
}

export default class Marketplace extends React.Component<MarketplaceState> {
    constructor(props: any) {
        super(props)

        this.state = {
            tradeable: market.basic,
            untradeable: market.untradeable,
            userMats: members.users[0].mats
        }

    }
    componentDidMount() {
        let all = [...this.state.tradeable, ...this.state.untradeable].map((a: any) => {
            return ({
                ...a,
                id: a.id,
                amount: this.state.userMats.filter((mat: any) => { return a.id == mat.id }).map((e: any) => {
                    return e.amount
                })[0]
            })
        })

        this.setState({
            userMats: all
        })
    }


    handleInputChange = (e: any, id: any) => {
        let matList = this.state.userMats.map((mat: any) => {
            if (mat.id == id) {
                return ({
                    id: id,
                    amount: e.target.value
                })
            }
            else return mat
        })

        this.setState({
            userMats: matList
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <PageHeader title="Marketplace" />
                <div className="content">
                    <Card>
                        <CardBody>
                            <div className="row">
                                <div className="col">
                                    <MarketTable
                                        title="Tradeable"
                                        items={this.state.tradeable}
                                        trade={true}
                                        mats={this.state.userMats}
                                        handleInputChange={this.handleInputChange}

                                    />
                                </div>
                                <div className="col">
                                    <MarketTable
                                        title="Untradeable"
                                        items={this.state.untradeable}
                                        trade={false}
                                        mats={this.state.userMats}
                                        handleInputChange={this.handleInputChange}

                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}
