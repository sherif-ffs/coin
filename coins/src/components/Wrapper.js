import React from 'react';
import Button from './Button'

export default class Wrapper extends React.Component {

    state = {
        count: 0,
        response: {},
    }

    increaseCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decreaseCount = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    componentDidMount() {
        // calling for currencies
        // fetch("https://api.nomics.com/v1/currencies/ticker?key=b5d23a53a23b59018cf74daf410dc556&ids=BTC,ETH,XRP,USDT,BCH,BSV,LTC,BNB,EOS,ADA,XTZ,LINK,XLM,LEO&interval=1d,30d&convert=USD")
        // .then(response => response.json())
        // .then(data => this.setState({ response: data}))

        // global ticker
        fetch("https://api.nomics.com/v1/currencies/ticker?key=db5d23a53a23b59018cf74daf410dc556&interval=1d,30d&convert=USD")
            .then(response => response.json())
            .then(data => console.log(data))

    }

    render() {
        let responseLoaded = false
        console.log('this.state: ', this.state)
        if (this.state.response[0]) {
            responseLoaded = true
        }
        return (
            <div className="wrapper">
                {responseLoaded ? <h1>{`${this.state.response[0].id}: Price`}:{this.state.response[0].price}</h1> : null }
            </div>
        )
    }
}


