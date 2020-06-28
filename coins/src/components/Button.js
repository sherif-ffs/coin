import React from 'react';

export default class Button extends React.Component {

    state = {
        count: 0
    }

    componentDidMount() {
        this.setState({
            count: this.props.count
        })
    }

    render() {
        return (
            <>
            <button onClick={this.props.getCurrencies}>Refresh data</button>
            </>
        )
    }
}
