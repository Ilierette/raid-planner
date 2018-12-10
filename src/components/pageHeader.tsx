import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface PageHeaderProps {
    title: string
}

export class PageHeader extends React.Component<PageHeaderProps> {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="page-header-content">
                        <div className="page-title">
                            <h4>
                                {this.props.title}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-line">
                    <div className="d-flex">
                        <div className="breadcrumb breadcrumb-site">
                            <a className="breadcrumb-item"><FontAwesomeIcon icon="home" className="mr-1" /> Home</a>
                            {this.props.title == "Home" ?(""):(
                                <a className="breadcrumb-item">
                                    {this.props.title}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
