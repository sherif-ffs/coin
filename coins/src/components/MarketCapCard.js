import React from 'react';
import '../styles/Header.css'
import CardRow from './CardRow'
export default class MarketCapCard extends React.Component {

    state = {
        marketCapGainers: []
    }

    componentDidMount() {
        this.setState({
            marketCapGainers: this.props.marketCapGainers
        })
    }

    render() {
        let marketCapGainers = this.state.marketCapGainers.map((currency, index) => {
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
        return (
            <div className="header-card market-cap">
                <h1 className="header-card__title">% Market Cap Gainers</h1>
                {marketCapGainers}
            </div>
        )
    }
}
