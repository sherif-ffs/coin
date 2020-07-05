import React from 'react'
import '../styles/Header.css'

export default class Header extends React.Component {

    state = {
        hottestCurrencies: [],
        marketCapGainers: [],
        marketCapYTD: []
    }

    componentDidMount() {
        let hotCurrencies = []
        this.props.hottestCurrencies.forEach(currency => {
            hotCurrencies.push({
                name: currency.name,
                symbol: currency.symbol,
                change: currency['1d'].price_change_pct
            })
        })

        let marketCapGainers = []
        this.props.marketCapGainers.forEach(currency => {
            marketCapGainers.push({
                name: currency.name,
                symbol: currency.symbol,
                change: currency['1d'].market_cap_change_pct
            })
        })

        let marketCapYTD = []
        this.props.marketCapYTD.forEach(currency => {
            marketCapYTD.push({
                percent: currency.market_cap,
                date: currency.timestamp.slice(0,10)
            })
        })
        this.setState({
            hottestCurrencies: hotCurrencies,
            marketCapGainers:  marketCapGainers,
            marketCapYTD: marketCapYTD
        })
    }
    render() {
        return (
            <div className="header">
                <div className="header-cards-wrapper">
                    <div className="header-card"></div>
                    <div className="header-card"></div>
                </div>
                <div className="header-chart-wrapper"></div>
            </div>
        )
    }
}