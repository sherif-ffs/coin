import React from 'react'
import '../styles/Header.css'
import HotCurrenciesCard from './HotCurrenciesCard' 
import MarketCapCard from './MarketCapCard';
import HeaderChart from './HeaderChart'

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
            console.log('currency: ', currency)
            marketCapGainers.push({
                name: currency.name,
                symbol: currency.symbol,
                change: currency['1d'].volume_change_pct
            })
        })
        console.log('marketCapGainers: ', marketCapGainers)
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
        console.log('this.state: ', this.state)
        if (this.state.hottestCurrencies.length > 1 && this.state.marketCapGainers.length > 1) {
            return (
                <div className="header">
                    <div className="header-cards-wrapper">
                        <HotCurrenciesCard hotCurrencies={this.state.hottestCurrencies}></HotCurrenciesCard>
                        <MarketCapCard marketCapGainers={this.state.marketCapGainers}></MarketCapCard>
                    </div>
                    <div className="header-chart-wrapper">
                        <HeaderChart></HeaderChart>
                    </div>
                </div>
            )
        } else {
            return null
        }
        
    }
}