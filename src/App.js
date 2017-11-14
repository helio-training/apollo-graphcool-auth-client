import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import './App.css';

class App extends Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _login = () => this.props.history.push("/login")

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
          <div >
            <AppBar
              title={`Logged in as ${this.props.loggedInUserQuery.loggedInUser.id}`}
              iconElementRight={<FlatButton label="Logout" onClick={this._logout} />}
            />
          </div>
    )
  }

  renderLoggedOut() {
    return (
          <div >
            <AppBar
          title="Example Login and Signup Code"
          iconElementRight={<FlatButton label="Login" onClick={this._login} />}
        />
        <h1>Please login to use this app.</h1>
          </div>
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
})(withRouter(App))
