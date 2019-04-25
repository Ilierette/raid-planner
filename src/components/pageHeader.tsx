import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface props {
    title: string
}

export const PageHeader = ({ title }: props) => {
    return (
        <div>
            <div className="page-header">
                <div className="page-header-content">
                    <div className="page-title">
                        <h4>
                            {title}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="breadcrumb-line">
                <div className="d-flex">
                    <div className="breadcrumb breadcrumb-site">
                        <a className="breadcrumb-item"><FontAwesomeIcon icon="home" className="mr-1" /> Home</a>
                        {title == "Home" ? ("") : (
                            <a className="breadcrumb-item">
                                {title}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

