import React from 'react';
import '../styles/table-row.css'
import numeral from 'numeral';

export default class Row extends React.Component {

    state = {
        negativeChange: false,
        positiveChange: false,
        noChange: true,
    }

    componentWillReceiveProps(newProps) {
        if (newProps.price == this.props.price) {
            this.setState({ 
                positiveChange: false,
                negativeChange: false,
                noChange: true
            })
        }
        else if (newProps.price > this.props.price) {
            this.setState({ 
                positiveChange: true,
                noChange: false
            })
        }
        else {
            this.setState({ 
                positiveChange: false,
                noChange: false
            })
        }
        
    }
    render() {
        return (
            <>
            {
                this.state.noChange ?
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
                    {/* <td>{this.props.price}</td> */}
                    <td>{numeral(this.props.price).format('($ 0.00a)')}</td>
                    {/* <td>{this.props.marketCap}</td> */}
                    <td>{numeral(this.props.marketCap).format('0.00a')}</td>
                    {/* <td>{this.props.supply}</td> */}
                    <td>{numeral(this.props.supply).format('0.00a')}</td>
                    {/* <td>{this.props.volume}</td> */}
                    <td>{numeral(this.props.volume).format('0.00a')}</td>
                    {this.props.change < 0 ? 
                    <td className="negative">{numeral(this.props.change).format('0.00%')}</td>
                    : <td className="positive">{numeral(this.props.change).format('0.00%')}</td>
                    }
                </tr>
                : (
                    this.state.positiveChange ? 
                    <tr className="table-row positive-change">
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
                    {this.props.change < 0 ? 
                    <td className="negative">{this.props.change}</td>
                    : <td className="positive">{this.props.change}</td>
                    }
                </tr>
                : 
                <tr className="table-row negative-change">
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
                    {this.props.change < 0 ? 
                    <td className="negative">{this.props.change}</td>
                    : <td className="positive">{this.props.change}</td>
                    }
                </tr>
                )
            }
            </>
        )
    }
}
