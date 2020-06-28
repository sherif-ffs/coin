import React from 'react';
import Button from './Button'
import TableRow from './TableRow'

export default class Wrapper extends React.Component {

    state = {
        currencies: {},
        limit: 20
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
          }, 10000);
        } catch(e) {
          console.log(e);
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
                        currency={currency.currency}
                        change={currency.price_change_pct}
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
                            <th>Change(24hr)</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {tableRows}
                    </tbody> 
                </table>
            </div>
        )
    }
}


