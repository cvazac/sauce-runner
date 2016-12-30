import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  state = {
    code: `if (window.XMLHttpRequest) {
  console.info(window.XMLHttpRequest.toString())
} else {
  console.info('no XMLHttpRequest')
}`
  }
  render () {
    const {code} = this.state
    return (
      <div>
        <textarea value={code} onChange={this.changeCode}></textarea>
        <button onClick={this.clickSubmit}>Submit</button>
      </div>
    )
  }

  changeCode = ({target: {value}}) => {
    this.setState({code: value})
  }

  clickSubmit = () => {
    const {code} = this.state

    axios.post('/start', {
      code,
    }).then((response) => {
      console.info(response)
    }).catch(({response: {data}}) => {
      console.error(data)
    })
  }

}
