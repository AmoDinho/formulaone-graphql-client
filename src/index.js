import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom';
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import { onError } from "apollo-link-error";



//Our URI
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})



//Link to Authentification 
const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return{
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})



//Instance of a new WebSocket Connection
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options:{
        reconnect:true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        }
    }
})

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
)






//Creating an instance of Apollo Server
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
})



ReactDOM.render(
    <BrowserRouter>
<ApolloProvider client={client}>
<App />
</ApolloProvider>
</BrowserRouter>,
 
document.getElementById('root'));
registerServiceWorker();
