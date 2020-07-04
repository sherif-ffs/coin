import React from 'react'
import '../styles/Header.css'

export default class Header extends React.Component {
    render() {
        console.log('this.props: ', this.props)
        return (
            <div className="header"></div>
        )
    }
}