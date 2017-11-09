import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';
import Login from './Login'
import Signup from './Signup'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9rnu35ldadw0113779izmw8' }),
  cache: new InMemoryCache()
});  

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <MuiThemeProvider>
        <BrowserRouter>
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
        </BrowserRouter>
        </MuiThemeProvider>
      </ApolloProvider>  
    )
  }
}

export default App;
