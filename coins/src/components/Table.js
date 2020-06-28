import React from 'react';
import TableRow from './TableRow'
import LoadMore from './LoadMore'

import '../styles/Table.css'

export default class Wrapper extends React.Component {

    state = {
        currencies: {},
        limit: 10
    }

    async componentDidMount() {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&interval=1d,30d&convert=USD`)
        .then(response => response.json())
        .then(data => this.setState({ currencies: data}))
        try {
          setInterval(async () => {
            const res = await fetch('https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&interval=1d,30d&convert=USD');
            const blocks = await res.json();

            this.setState({
                currencies: blocks,
            })
          }, 1500);
        } catch(e) {
          console.log(e);
        }
  }
    loadMore = () => {
        this.setState({
            limit: this.state.limit + 20
        })
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
                            <th>Rank</th>
                            <th>Name</th> 
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>Supply</th>
                            <th>Volume (24hr)</th>
                            <th>Change (24hr)</th>
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


