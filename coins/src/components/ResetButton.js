import React from 'react';
import '../styles/Button.css'

export default class ResetButton extends React.Component {

    render() {
        return (
            <>
            <button onClick={this.props.resetTable} className="load-more-button">Reset Table</button>
            </>
        )
    }
}
