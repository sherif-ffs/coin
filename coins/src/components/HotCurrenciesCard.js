import React from 'react';
import '../styles/HotCurrenciesCard.css'
import CardRow from './CardRow'

export default class HotCurrenciesCard extends React.Component {

    state = {
        hottestCurrencies: []
    }

    componentDidMount() {
        this.setState({
            hottestCurrencies: this.props.hotCurrencies
        })
    }

    render() {
        let hotCardRows = this.state.hottestCurrencies.map((currency, index) => {
            return (
                <CardRow
                    key={index}
                    number={index}
                    name={currency.name}
                    change={currency.change}
                    symbol={currency.symbol}
                >
                </CardRow>
            )
        })
        if (this.state.hottestCurrencies.length > 1) {
            return (
                <div className="header-card hot-currencies">
                    <h1 className="header-card__title">% Price Gainers</h1>
                    {hotCardRows}
                </div>
            )
        } else {
            return null
        }
        
    }
}
