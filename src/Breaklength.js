import React, { Component } from 'react';
import './Breaklength.css';

class Breaklength extends Component {
    render() {
        return (
            <div>
                <h2 id="break-label">Break Length</h2>
                <button id="break-decrement" onClick={this.props.decrement}>-</button>
                <h3 id="break-length">{this.props.break}</h3>
                <button id="break-increment" onClick={this.props.increment}>+</button>
            </div>
            
        )
    }
}

export default Breaklength;