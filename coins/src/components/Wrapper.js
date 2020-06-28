import React from 'react';
import Button from './Button'

export default class Wrapper extends React.Component {

    state = {
        currencies: {},
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
        console.log('this.state: ', this.state)
        if (this.state.currencies[0]) {
            responseLoaded = true
        }
        return (
            <div className="wrapper">
                {responseLoaded ? <h1>{`${this.state.currencies[0].id}: Price`}:{this.state.currencies[0].price}</h1> : null }
                <Button getCurrencies={this.getCurrencies}></Button>
            </div>
        )
    }
}


