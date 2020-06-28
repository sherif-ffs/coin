import React from 'react';
import '../styles/table-row.css'

export default class Row extends React.Component {

    render() {
        return (
            <>
            <tr className="table-row">
                <td>{this.props.rank}</td>
                <td>
                    <div className="logo-name-wrapper">
                        <img src={this.props.logo}></img>
                        <div className="name-wrapper">
                            <p className="name">{this.props.name}</p>
                            <p className="id">{this.props.id}</p>
                        </div>
                    </div>
                </td>
                <td>{this.props.price}</td>
                <td>{this.props.marketCap}</td>
                <td>{this.props.supply}</td>
                <td>{this.props.volume}</td>
                <td>{this.props.change}</td>
            </tr>
            </>
        )
    }
}
