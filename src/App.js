import React, { Component } from 'react';
import './App.css';
import Sessionlength from './Sessionlength';
import Breaklength from './Breaklength';
import Session from './Session';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      session: 0,
      break: 0,
      counting: false,
      breakCounter: false,
      sessionCounter: true
    }
    this.renderTime = this.renderTime.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
  }

  componentWillMount() {
    this.setState({
      session: this.state.sessionLength * 60,
      break: this.state.breakLength * 60
    })
  }

  breakDisplay() {
    this.setState({
      breakCounter: true,
      sessionCounter: false
    })
    return this.state.breakLength * 60;
  }

  sessDisplay() {
    this.setState({
      breakCounter: false,
      sessionCounter: true
    })
    return this.state.sessionLength * 60
  }

  sessionIncrement() {
    if (this.state.sessionLength < 60) {
      document.getElementById('timer-label').innerText = "Session";
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        session: (this.state.sessionLength + 1) * 60
      })
    }
    
  }
  sessionDecrement() {
    if (this.state.sessionLength > 1) {
      document.getElementById('timer-label').innerText = "Session";
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        session: (this.state.sessionLength - 1) * 60
      })
    }
  }

  breakIncrement() {
    if (this.state.breakLength < 60) {
      document.getElementById('timer-label').innerText = "Break";
      this.setState({
        breakLength: this.state.breakLength + 1,
        session: (this.state.breakLength + 1) * 60
      })
    }
    
  }

  breakDecrement() {
    if (this.state.breakLength > 1) {
      document.getElementById('timer-label').innerText = "Break";
      this.setState({
        breakLength: this.state.breakLength - 1,
        session: (this.state.breakLength - 1) * 60
      })
    }
  }
  
  switchDisplay() {
    document.getElementById('beep').play();
    document.getElementById('timer-label').innerText === "Session" ? document.getElementById('timer-label').innerText = "Break" : document.getElementById('timer-label').innerText = "Session";
  }

  startStop = () => {
    if (this.state.counting) {
      clearInterval(this.myInterval)
      this.setState({
        counting: false,
      })
    } else {
    this.myInterval = setInterval(() => {
      this.setState({
        session: this.state.session > 0 ? this.state.session - 1 : this.state.session === 0 ? this.switchDisplay() : this.state.breakCounter === false ? this.breakDisplay() : this.sessDisplay(),
        counting: this.state.session > 0 ? true : false,
      })
    }, 1000)
  }
  }

  reset() {
    clearInterval(this.myInterval)
    document.getElementById('timer-label').innerText = "Session";
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      session: 1500,
      counting: false,
    })
  }

  renderTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    time--;
      return minutes + ":" + seconds;
    } 


 
  render() {
    return (
      <div id="Pomodoro">
      
        <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"></audio> 
        <h1>Pomodoro Clock</h1>
        <Sessionlength increment={this.sessionIncrement} decrement={this.sessionDecrement} session={this.state.sessionLength}/>
        <Breaklength increment={this.breakIncrement} decrement={this.breakDecrement} break={this.state.breakLength}/>
        <Session  start={this.startStop} reset={this.reset} time={this.renderTime(this.state.session)} />
      </div>
      
    )
  }
}

export default App;
