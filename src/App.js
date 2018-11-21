import React, { Component } from 'react';
import './App.css';
import Sessionlength from './Sessionlength';
import Breaklength from './Breaklength';
import Session from './Session';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      sessionZ: 1500,
      breakCounter: false,
      counting: false
    }
    this.renderTime = this.renderTime.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
  }

  sessionIncrement() {
    if (this.state.breakCounter && this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1
      })
    }
    else if (this.state.sessionLength < 60 && !this.state.breakCounter) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        sessionZ: this.state.sessionZ + 60
      })
    }
    
  }
  sessionDecrement() {
    if (this.state.breakCounter && this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1
      })
    }
    if (this.state.sessionLength > 1 && !this.state.breakCounter) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        sessionZ: this.state.sessionZ - 60
      })
    }
  }

  breakIncrement() {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      })
    }
    
  }

  breakDecrement() {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1,
      })
    }
  }


  main() {
     if (this.state.sessionZ === 0) {
         if (this.state.breakCounter) {
            document.getElementById('timer-label').innerText = "Session";
            this.setState({
                sessionZ: this.state.sessionLength * 60,
                breakCounter: false
            })
            
         } else {
            document.getElementById('timer-label').innerText = "Break";
        
        this.setState({
            sessionZ: this.state.breakLength * 60,
            breakCounter: true
        })
        }
      }
      document.getElementById('beep').play();
      return this.state.sessionZ;
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
        sessionZ: this.state.sessionZ > 0 ? this.state.sessionZ - 1 : this.main(),
        counting: true
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
      sessionZ: 1500,
      breakLength: 5,
      counting: false,
      breakCounter: false
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
      {console.log(this.state.sessionZ)}
        <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"></audio> 
        <h1>Pomodoro Clock</h1>
        <Sessionlength increment={this.sessionIncrement} decrement={this.sessionDecrement} session={this.state.sessionLength}/>
        <Breaklength increment={this.breakIncrement} decrement={this.breakDecrement} break={this.state.breakLength}/>
        <Session  start={this.startStop} reset={this.reset} time={this.renderTime(this.state.sessionZ)} />
      </div>
      
    )
  }
}

export default App;
