import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllSynthrooms, createNewSynthroom, setUsername } from './actions'
import SynthroomContainer from './SynthroomContainer'
import { Route, withRouter } from 'react-router-dom'
import liquidCrystal from './liquid_crystal.gif'

class App extends Component {

  state = {
    newSynthroomInput: null,
    usernameInput: null
  }

  componentDidMount = () => {
    this.props.fetchAllSynthrooms()
    if (localStorage.getItem("username")) {
      this.props.setUsername(localStorage.getItem("username"))
    }
  }

  componentDidCatch = (error, info) => {
    this.props.history.push(`/`)
  }

  listSynthrooms = () => {
    return this.props.allSynthrooms.map((synthroom) => {
      return (<option value={synthroom.id} key={synthroom.id} id={synthroom.id}>{synthroom.name}</option>)
    })
  }

  handleSelect = (event) => {
    this.props.history.push(`/synthrooms/${event.target.value}`)
  }

  handleCreate = () => {
    this.props.createNewSynthroom(this.state.newSynthroomInput)
    .then((synthroom) => this.props.history.push(`/synthrooms/${synthroom.id}`) )
  }

  handleSetUsername = () => {
    this.props.setUsername(this.state.usernameInput)
  }

  render() {
    return (
      <div className="master-container">
        <Route exact path="/" render={(routerProps) => {
          //create a component for this select
          return(
            <div className="landing">
              <input className="username-input" type="text" placeholder="enter username..." value={this.state.usernameInput} onChange={(event) => this.setState({usernameInput: event.target.value})}/>
              <button onClick={this.handleSetUsername}>SET USERNAME</button>
              <br/>
              <select name="roomSelect" id="roomSelect" onChange={this.handleSelect}>
                <option disabled selected value>SELECT ROOM</option>
                {this.listSynthrooms()}
              </select>
              <span> OR </span>
              <input type="text" placeholder="enter new room name..." value={this.state.newSynthroomInput} onChange={(event) => this.setState({newSynthroomInput: event.target.value})}/>
              <button onClick={this.handleCreate}>CREATE</button>
              <img className="crystal" id="crystal-left" src={liquidCrystal} alt=""/>
              <img className="crystal" id="crystal-right" src={liquidCrystal} alt=""/>
            </div>
          )
        }}/>
        <Route path="/synthrooms/:id" render={(routerProps) => {

          // return <div>{routerProps.match.params.id}</div>
          return <SynthroomContainer {...routerProps}/>
        }}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {...state}
}

export default withRouter(connect(mapStateToProps, { fetchAllSynthrooms, createNewSynthroom, setUsername })(App))
