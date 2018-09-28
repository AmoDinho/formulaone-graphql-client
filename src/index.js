import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom';
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants';

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return{
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: (e) => {console.log(e.graphQLErrors)}
})



ReactDOM.render(
    <BrowserRouter>
<ApolloProvider client={client}>
<App />
</ApolloProvider>
</BrowserRouter>,
 
document.getElementById('root'));
registerServiceWorker();
