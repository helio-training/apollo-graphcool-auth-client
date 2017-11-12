import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import './App.css';
import Login from './Login'
import Signup from './Signup'

 
class App extends Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _isLoggedIn = () => {
    return this.props.loggedInUserQuery.loggedInUser && this.props.loggedInUserQuery.loggedInUser.id !== null
  }

  render() {
    if (this.props.loggedInUserQuery.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
        <MuiThemeProvider>
          <div >
            <AppBar
              title={`Logged in as ${this.props.loggedInUserQuery.loggedInUser.id}`}
              iconElementRight={<FlatButton label="Logout" onClick={this._logout} />}
            />
          </div>
        </MuiThemeProvider>
    )
  }

  renderLoggedOut() {
    return (
        <MuiThemeProvider>
          <div >
            <AppBar
              title="Example Login and Signup Code"
              iconElementRight={<FlatButton label="Login" />}
            />
            <div className='container'>
              <Login />
              <Signup />
            </div>
          </div>
        </MuiThemeProvider>
    )
  }
}  

const LOGGED_IN_USER_QUERY = gql`
  query loggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' }
})(App)
