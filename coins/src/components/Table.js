import React from 'react';
import TableRow from './TableRow'
import LoadMore from './LoadMore'

import '../styles/Table.css'

export default class Wrapper extends React.Component {

    state = {
        currencies: {},
        limit: 10,
        sortByRank: false,
        sortByPrice: false,
        sortByChange: false,
    }

    async componentDidMount() {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&interval=1d,30d&convert=USD`)
        .then(response => response.json())
        .then(data => this.setState({ currencies: data.slice(0, 1500)}))
        try {
            const res = await fetch('https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&interval=1d,30d&convert=USD');
            const blocks = await res.json();
            let currencies = []
            if (this.state.sortByRank) {
                currencies = blocks.slice(0, 1500).sort((a,b) => b.rank - a.rank)
            } else if (!this.state.sortByRank) {
                currencies = blocks.slice(0, 1500).sort((a,b) => a.rank - b.rank)
            }
            else if (!this.state.sortByRank && !this.state.sortByChange && this.state.sortByPrice) {
                currencies = blocks.slice(0, 1500).sort((a,b) => b.price - a.price)
            }
            else if (!this.state.sortByRank && this.state.sortByChange && !this.state.sortByPrice) {
                let filteredCurrencies = blocks.slice(0, 1500).filter(block => block['1d'].price_change_pct)
                currencies = filteredCurrencies.slice(0, 1500).sort((a,b) => b['1d'].price_change_pct - a['1d'].price_change_pct)
            }
            else {
                currencies = blocks.slice(0, 1500).sort((a,b) => a.price - b.price)
            }
            this.setState({
                currencies: blocks.slice(0, 1500),
            })
        } catch(e) {
          console.log(e);
        }
    }

    loadMore = () => {
        this.setState({
            limit: this.state.limit + 20
        })
    }
    sortByRank = () => {
        const currencies = this.state.currencies
        let sortedCurrencies = []
        if (this.state.sortByRank) {
            sortedCurrencies = currencies.slice(0, 1500).sort((a,b) => b.rank - a.rank)
            this.setState({
                currencies: sortedCurrencies,
                sortByRank: false
            })
        } else {
            sortedCurrencies = currencies.slice(0, 1500).sort((a,b) => a.rank - b.rank)
            this.setState({
                currencies: sortedCurrencies,
                sortByRank: true
            })
        }
    }

    sortByPrice = () => {
        const currencies = this.state.currencies
        let sortedCurrencies = []
        if (this.state.sortByPrice) {
            sortedCurrencies = currencies.slice(0, 1500).sort((a,b) => b.price - a.price)
            this.setState({
                currencies: sortedCurrencies,
                sortByPrice: false
            })
        } else {
            sortedCurrencies = currencies.slice(0, 1500).sort((a,b) => a.price - b.price)
            console.log('sortedCurrencies: ', sortedCurrencies)
            this.setState({
                currencies: sortedCurrencies,
                sortByPrice: true
            })
        }
    }
    sortByChange = () => {
        const currencies = this.state.currencies
        let sortedCurrencies = []
        if (this.state.sortByChange) {
            let filteredCurrencies = currencies.slice(0, 1500).filter(currency => currency['1d'] != null)
            sortedCurrencies = filteredCurrencies.slice(0, 1500).sort((a,b) => a['1d'].price_change_pct - b['1d'].price_change_pct)
            this.setState({
                currencies: sortedCurrencies,
                sortByChange: false
            })
        } else {
            let filteredCurrencies = currencies.slice(0, 1500).filter(currency => currency['1d'] != null)
            console.log('filteredCurrencies: ', filteredCurrencies)
            sortedCurrencies = filteredCurrencies.sort((a,b) => b['1d'].price_change_pct - a['1d'].price_change_pct)
            this.setState({
                currencies: sortedCurrencies,
                sortByChange: true
            })
        }
    }
    render() {
        let responseLoaded = false
        let tableRows = []
        if (this.state.currencies[0]) {
            responseLoaded = true;
            tableRows = this.state.currencies.slice(0, this.state.limit).map(currency => {
                return(
                    <TableRow
                        key={currency.rank}
                        logo={currency.logo_url}
                        price={currency.price}
                        name={currency.name}
                        rank={currency.rank}
                        realRank={currency.realRank}
                        currency={currency.currency}
                        id={currency.id}
                        marketCap={currency.market_cap}
                        supply={currency.circulating_supply}
                        volume={currency['1d'] ? currency['1d'].volume : 'N/A' }
                        change={currency['1d'] ? currency['1d'].price_change_pct : 'N/A'}
                    ></TableRow>
                )
            })
        }
        
        return (
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={this.sortByRank}>Rank</th>
                            <th>Name</th> 
                            <th onClick={this.sortByPrice}>Price</th>
                            <th>Market Cap</th>
                            <th>Supply</th>
                            <th>Volume (24hr)</th>
                            <th onClick={this.sortByChange}>Change (24hr)</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {tableRows}
                    </tbody> 
                </table>
                <LoadMore loadMore={this.loadMore}></LoadMore>
            </div>
        )
    }
}


