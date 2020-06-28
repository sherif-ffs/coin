import React from 'react';
import '../styles/table-row.css'

export default class Row extends React.Component {

    render() {
        return (
            <>
            <tr className="table-row">
                <td>{this.props.rank}</td>
                <td><img src={this.props.logo}></img></td>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
            </>
        )
    }
}
