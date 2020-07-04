import React from 'react';
import '../styles/Dashboard.css'
import Table from './Table'
import Header from './Header'

export default class Dashboard extends React.Component {

    state = {
        hottestCurrencies: {}
    }
    
    componentDidMount() {
        let filteredCurrencies = this.props.currencies.slice(0, 1500).filter(currency => currency['1d'] != null)
        let hottestCurrencies = filteredCurrencies.sort((a,b) => b['1d'].price_change_pct - a['1d'].price_change_pct)
        
        this.setState({
            hottestCurrencies: hottestCurrencies.slice(0,5)
        })
    }

    render() {
        return (
            <>
            <div className="dashboard">
                <Header hottestCurrencies={this.state.hottestCurrencies}></Header>
                <Table></Table>
            </div>
            </>
        )
    }
}
