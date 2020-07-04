import React from 'react';
import '../styles/Dashboard.css'
import Table from './Table'
import Header from './Header'

export default class Dashboard extends React.Component {

    state = {
        hottestCurrencies: {},
        marketCapGainers: {},
        currencies: []
    }
    
    componentDidMount() {
        let filteredCurrencies = this.props.currencies.slice(0, 1500).filter(currency => currency['1d'] != null)
        let hottestCurrencies = filteredCurrencies.sort((a,b) => b['1d'].price_change_pct - a['1d'].price_change_pct)
        let marketCapGainers = filteredCurrencies.sort((a,b) => b['1d'].market_cap_change_pct - a['1d'].market_cap_change_pct)
        // console.log('marketCapGainers: ', marketCapGainers.slice(0,5))
        this.setState({
            hottestCurrencies: hottestCurrencies.slice(0,5),
            marketCapGainers: marketCapGainers.slice(0,5),
            currencies: this.props.currencies
        })
    }

    render() {
        return (
            <>
            <div className="dashboard">
                <Header hottestCurrencies={this.state.hottestCurrencies} marketCapGainers={this.state.marketCapGainers}></Header>
                <Table currencies={this.props.currencies}></Table>
            </div>
            </>
        )
    }
}