import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  state = {
    time: this.getTime()
  }

  getTime() {
    const currentTime = new Date();
    return ({
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
    }
    )
  }

  setTime() {
    const time = this.getTime()
    this.setState({ time })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setTime(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { hours, minutes, seconds } = this.state.time
    return (
      <>
        <div className='Clock'>
          <h3>
            {hours > 9 ? hours : `0${hours}`} :
             {minutes > 9 ? minutes : `0${minutes}`} :
            {seconds > 9 ? seconds : `0${seconds}`}
          </h3>
        </div>
      </>
    );
  }
}

export default Clock;