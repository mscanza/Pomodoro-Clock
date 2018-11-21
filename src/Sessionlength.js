import React, { Component } from 'react';
import './Sessionlength.css';

class Sessionlength extends Component {
    render() {
        return (
            <div>
                <h2 id="session-label">Session Length</h2>
                <button id="session-decrement" onClick={this.props.decrement}>-</button>
                <h3 id="session-length">{this.props.session}</h3>
                <button id="session-increment" onClick={this.props.increment}>+</button>
            </div>
            
        )
    }
}

export default Sessionlength;