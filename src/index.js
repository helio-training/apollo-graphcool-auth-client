import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
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
        <App />
    </ApolloProvider>    
),
    document.getElementById('root')
)
