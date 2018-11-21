import React, { Component } from 'react';
import './Session.css'



class Session extends Component {


    render() {
        return  (
            <div>          
                <h2 id="timer-label">Session</h2>
                <h3 id="time-left">{this.props.time}</h3>
                <button className="buttons" id="start_stop" onClick={this.props.start}>Start/Stop</button>
                <button className="buttons" id="reset" onClick={this.props.reset}>Reset</button>
            </div>
            
        )
    }
}

export default Session;