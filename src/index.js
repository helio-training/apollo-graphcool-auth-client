import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
import Login from './Login'
import Signup from './Signup'
import NotFound from './NotFound'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9rujvon5fws0101zrovodmr' })

const middlewareLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('graphcoolToken')
    const authorizationHeader = token ? `Bearer ${token}` : null
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    })
    return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

ReactDOM.render((
    <ApolloProvider client={client}>
        <MuiThemeProvider>
        <BrowserRouter>
            <Switch>    
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route component={NotFound} />
            </Switch>    
            </BrowserRouter>    
        </MuiThemeProvider>    
    </ApolloProvider>    
),
    document.getElementById('root')
)
