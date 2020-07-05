import React from 'react';
import '../styles/CardRow.css'

export default class CardRow extends React.Component {

    render() {
        console.log('this.props: ', this.props)
        return (
            <div className="card-row">
                <p className="card-row__number">{this.props.number + 1}</p>
                <p className="card-row__name">{this.props.name}</p>
                <p className="card-row__symbol">{this.props.symbol}</p>
                <p className="card-row__change">% {this.props.change}</p>
            </div>
        )
        
    }
}
