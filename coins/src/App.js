import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'


class App extends React.Component {

  state = {
    currencies: [],
    marketCapYTD: []
  }

   componentDidMount() {
    fetch(`https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&interval=1d,7d,30d,365d&convert=USD`)
    .then(response => response.json())
    .then(data => this.setState({ currencies: data.slice(0, 1500)}))

    fetch("https://api.nomics.com/v1/market-cap/history?key=b5d23a53a23b59018cf74daf410dc556&start=2020-01-01T00%3A00%3A00Z")
    .then(response => response.json())
    .then(data => this.setState({ marketCapYTD: data }))
  }

render() {
  console.log('this.state; ', this.state)
  
  if (this.state.currencies.length > 0) {
    return (
      <Dashboard currencies={this.state.currencies}></Dashboard>
    )
  } else {
    return (
      null
    );
  }
  
}
  
}

export default App;
