import * as React from 'react';
import '../../scss/table.scss';

export const RaidRecruitTable = () => {
    return (
        <div className="table-responsive">
            <table className="table table-sm text-center">
                <thead>
                    <tr>
                        <th style={{ width: 70 }} >Leader</th>
                        <th style={{ width: 70 }} >Type</th>
                        <th >Requirements</th>
                        <th style={{ width: 150 }} >Min dps</th>
                        <th style={{ width: 70 }} >Alts?</th>
                        <th style={{ width: 50 }} ></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Faustynian
                        </td>
                        <td>
                            TT
                            </td>
                        <td>
                            High dps
                        </td>
                        <td>
                            1kkk + 
                        </td>
                        <td>
                            no
                          </td>
                        <td>
                            <button className="btn btn-primary btn-sm"> Apply </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

