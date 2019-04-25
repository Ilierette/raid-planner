import * as React from 'react';

interface ChangelogProps {
    log: any;
}

export const Changelog = ({log}:ChangelogProps) =>{
    return (
        <div className={log.checklist ? "card text-white bg-dark mb-3 border-primary" : "card text-white bg-dark mb-3 border-danger"}>
            <div className="card-header">
                {log.title}
            </div>
            {
                log.checklist ?
                    <div className="card-body">
                        <ul>
                            {
                                log.checklist.map((check: any, id: any) => (
                                    <li key={id}>
                                        <input className="form-check-input" type="checkbox" defaultChecked={check.isChecked} />
                                        {check.title}
                                        {
                                            check.checklist &&
                                            <ul>
                                                {
                                                    check.checklist.map((check: any, id: any) => (
                                                        <li key={id}>
                                                            <input className="form-check-input" type="checkbox" defaultChecked={check.isChecked} />
                                                            {check.title}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        }

                                    </li>
                                ))
                            }
                        </ul>
                    </div> :
                    <div className="card-body text-center">
                        <span className="text-danger">{log.extra}</span>
                    </div>
            }

        </div>
    )
}
