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
        let hottestCurrencies = filteredCurrencies.slice(0, 1500).sort((a,b) => b['1d'].price_change_pct - a['1d'].price_change_pct)
        let marketCapGainers = filteredCurrencies.sort((a,b) => b['1d'].volume_change_pct - a['1d'].volume_change_pct)
        console.log('hottestCurrencies: ', hottestCurrencies)
        console.log('marketCapGainers: ', marketCapGainers)
        this.setState({
            hottestCurrencies: hottestCurrencies.slice(0, 5),
            marketCapGainers: marketCapGainers.slice(0,5),
            currencies: this.props.currencies
        })
    }

    render() {
        if (this.state.hottestCurrencies.length > 1) {
            return (
                <>
                <div className="dashboard">
                    <Header 
                    hottestCurrencies={this.state.hottestCurrencies} 
                    marketCapGainers={this.state.marketCapGainers}
                    marketCapYTD={this.props.marketCapYTD}
                    ></Header>
                    <Table currencies={this.props.currencies}></Table>
                </div>
                </>
            )
        } else {
            return null
        }
        
    }
}
